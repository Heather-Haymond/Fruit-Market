const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.post("/sell", (req, res) => {
  const { userId, fruitId, quantity } = req.body;

  if (!userId || !fruitId || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const updateQuery = `
    UPDATE inventory 
    SET quantity = quantity - $1
    WHERE user_id = $2 AND fruit_id = $3
    RETURNING *
  `;

  const deleteQuery = `
    DELETE FROM inventory
    WHERE user_id = $1 AND fruit_id = $2 AND quantity <= 0
  `;

  pool.query("BEGIN")
    .then(() => {
      return pool.query(updateQuery, [quantity, userId, fruitId]);
    })
    .then((updateResult) => {
      if (updateResult.rowCount > 0) {
        return pool.query(deleteQuery, [userId, fruitId]);
      } else {
        throw new Error("No inventory item found to sell");
      }
    })
    .then(() => {
      pool.query("COMMIT");
      res.sendStatus(200);
    })
    .catch((error) => {
      pool.query("ROLLBACK");
      console.error("Error selling item from inventory:", error);
      res.status(500).json({ error: "Error selling item from inventory" });
    });
});

module.exports = router;
