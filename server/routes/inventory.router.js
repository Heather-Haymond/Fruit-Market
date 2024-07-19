const express = require('express');
const router = express.Router();
const pool = require('../modules/pool'); 

// GET all inventory
router.get('/', (req, res) => {
  const query = 'SELECT * FROM inventory;'; 
  pool.query(query)
    .then((result) => {
      const formattedRows = result.rows.map(row => ({
        ...row,
        purchase_price: parseFloat(row.purchase_price) 
      }));
      res.json(formattedRows); 
    })
    .catch((error) => {
      console.error('Error fetching inventory:', error);
      res.sendStatus(500);
    });
});

router.post('/buy', async (req, res) => {
  const { user_id, fruit_id, quantity, purchase_price } = req.body;

  if (!user_id || !fruit_id || !quantity || !purchase_price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const formattedPrice = parseFloat(purchase_price).toFixed(2);

  try {
    const result = await pool.query(
      `INSERT INTO inventory (user_id, fruit_id, quantity, purchase_price) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [user_id, fruit_id, quantity, formattedPrice]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error buying fruit:', error);
    res.status(500).json({ error: 'Failed to buy fruit' });
  }
});

router.post("/sell", async (req, res) => {
  const { user_id, fruit_id, quantity, purchase_price } = req.body;

  if (!user_id || !fruit_id || !quantity || !purchase_price) {
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

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const updateResult = await client.query(updateQuery, [quantity, user_id, fruit_id]);

    if (updateResult.rowCount > 0) {
      await client.query(deleteQuery, [user_id, fruit_id]);
    } else {
      throw new Error('No inventory item found to sell');
    }

    await client.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error selling item from inventory:', error);
    res.status(500).json({ error: 'Error selling item from inventory' });
  } finally {
    client.release();
  }
});
module.exports = router;