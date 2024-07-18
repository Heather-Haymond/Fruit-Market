const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.post('/buy', async (req, res) => {
  const { user_id, fruit_id, quantity, purchase_price } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO inventory (user_id, fruit_id, quantity, purchase_price) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [user_id, fruit_id, quantity, purchase_price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error buying fruit:', error);
    res.status(500).json({ error: 'Failed to buy fruit' });
  }
});

module.exports = router;


