const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// Fetch inventory with fruit details
router.get("/inventory", async (req, res) => {
  try {
    const query = `
      SELECT 
        inventory.id AS inventory_id, 
        inventory.user_id, 
        inventory.fruit_id, 
        fruits.name AS fruit_name, 
        inventory.quantity, 
        inventory.purchase_price 
      FROM inventory
      JOIN fruits ON inventory.fruit_id = fruits.id;
    `;
    const { rows: inventory } = await pool.query(query);
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error fetching inventory with fruit details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update all fruit prices

router.put("/fruits/prices", (req, res) => {
  const queryText = ` 
  UPDATE fruits 
  SET current_price =  
  CASE  
  WHEN current_price + (random() - 0.5) * 0.50 < 0.50 THEN 0.50 
  WHEN current_price + (random() - 0.5) * 0.50 > 9.99 THEN 9.99 
  ELSE ROUND(CAST(current_price + (random() - 0.5) * 0.50 AS numeric), 2)
  END 
  RETURNING id, name, current_price; 
  `;

  pool
    .query(queryText)
    .then((result) => {
      console.log(`Updated price for fruits`);
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.error(`Error updating price for fruits`, error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Fetch all fruits
router.get("/", (req, res) => {
  pool
    .query("SELECT * FROM fruits")
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error("Error fetching fruits", error);
      res.sendStatus(500);
    });
});

module.exports = router;
