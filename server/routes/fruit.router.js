const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Fetch inventory with fruit details
router.get('/inventory', async (req, res) => {
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
    console.error('Error fetching inventory with fruit details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update all fruit prices
router.put('/update-all', async (req, res) => {
  try {
    const { rows: fruits } = await pool.query('SELECT id, current_price FROM fruits');
    const updates = fruits.map(fruit => {
      const currentPrice = fruit.current_price;
      let fluctuation = (Math.random() * 0.50) - 0.25;
      let newPrice = currentPrice + fluctuation;

      if (currentPrice <= 0.51) {
        fluctuation = Math.min(fluctuation, 0.51 - currentPrice);
      } else if (currentPrice >= 9.49) {
        fluctuation = Math.max(fluctuation, 9.99 - currentPrice);
      }

      newPrice = currentPrice + fluctuation;
      if (newPrice > 9.99) newPrice = 9.99;
      if (newPrice < 0.50) newPrice = 0.50;

      return pool.query(
        'UPDATE fruits SET current_price = $1 WHERE id = $2 RETURNING id, name, current_price',
        [newPrice, fruit.id]
      );
    });

    const results = await Promise.all(updates);
    res.status(200).json({ message: 'Prices updated successfully', results: results.map(result => result.rows[0]) });
  } catch (error) {
    console.error('Error updating prices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all fruits
router.get("/", (req, res) => {
  pool.query('SELECT * FROM fruits')
    .then(result => res.send(result.rows))
    .catch(error => {
      console.error('Error fetching fruits', error);
      res.sendStatus(500);
    });
});

module.exports = router;

