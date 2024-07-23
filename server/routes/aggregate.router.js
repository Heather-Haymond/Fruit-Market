const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Fetch total quantity and average purchase price for each fruit owned by each user
router.get('/inventory-summary', async (req, res) => {
  const query = `
    SELECT 
      u.username,
      f.name AS fruit_name,
      SUM(i.quantity) AS total_quantity,
      AVG(i.purchase_price) AS average_purchase_price
    FROM inventory i
    JOIN "user" u ON i.user_id = u.id
    JOIN fruits f ON i.fruit_id = f.id
    GROUP BY u.username, f.name;
  `;

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inventory summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch total quantity of each fruit in inventory
router.get('/total-fruit-quantity', async (req, res) => {
  const query = `
    SELECT 
      f.name AS fruit_name,
      SUM(i.quantity) AS total_quantity
    FROM inventory i
    JOIN fruits f ON i.fruit_id = f.id
    GROUP BY f.name;
  `;

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching total fruit quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch average purchase price of each fruit
router.get('/average-fruit-price', async (req, res) => {
  const query = `
    SELECT 
      f.name AS fruit_name,
      AVG(i.purchase_price) AS average_purchase_price
    FROM inventory i
    JOIN fruits f ON i.fruit_id = f.id
    GROUP BY f.name;
  `;

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching average fruit price:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
