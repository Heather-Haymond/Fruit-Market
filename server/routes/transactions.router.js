const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const cashUserModule = require('../../src/utils/cashUser');
console.log(cashUserModule);

// Buy Route
router.post('/buy', async (req, res) => {
    const { user_id, fruit_id, quantity, purchase_price } = req.body;
  
    if (!user_id || !fruit_id || !quantity || !purchase_price|| quantity <= 0 || purchase_price <= 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const formattedPrice = parseFloat(purchase_price).toFixed(2);
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');
       // Insert into inventory
      const inventoryResult = await client.query(
        `INSERT INTO inventory (user_id, fruit_id, quantity, purchase_price) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [user_id, fruit_id, quantity, formattedPrice]
      );
 // Calculate the total purchase price
      const totalPurchasePrice = (quantity * parseFloat(purchase_price)).toFixed(2);

    // Get current cash
      const currentCashResult = await client.query(
        'SELECT total_cash FROM "user" WHERE id = $1',
        [user_id]
      );
      const currentCash = parseFloat(currentCashResult.rows[0].total_cash) || 0;
 
       // Calculate new total cash
      const newTotalCash = calculateNewTotalCash(currentCash - parseFloat(totalPurchasePrice))

      // Check for sufficient funds and cash cap
      if (parseFloat(newTotalCash) < 0) {
        throw new Error('Insufficient funds');
    }
      // Cap cash at $100 
    const cappedTotalCash = Math.min(newTotalCash, 100); 
      
  
      await updateTotalCash(client, user_id, cappedTotalCash);
      await client.query('COMMIT');
  
      res.status(201).json({
        inventory: inventoryResult.rows[0],
        newTotalCash: formatCash(cappedTotalCash),
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error buying fruit:', error);
    if (error.message === 'Insufficient funds') {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
      console.error('Error buying fruit:', error);
      res.status(500).json({ error: 'Failed to buy fruit', details: error.message });
    } finally {
      client.release();
    }
  });
  
  // Sell Route
  router.post('/sell', async (req, res) => {
    const { user_id, fruit_id, quantity } = req.body;
  
    if (!user_id || !fruit_id || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Missing or invalid required fields' });
    }
  
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');
  
      const inventoryItem = await getInventoryItem(client, user_id, fruit_id);
      if (!inventoryItem) {
        throw new Error('Inventory item not found');
      }
      const updatedQuantity = inventoryItem.quantity - quantity;
  
      if (updatedQuantity > 0) {
        await updateInventory(client, user_id, fruit_id, updatedQuantity);
      } else {
        await deleteInventoryItem(client, user_id, fruit_id);
      }
  
      const totalCash = await getTotalCash(client, user_id);
      const purchasePrice = parseFloat(inventoryItem.purchase_price);
      const newTotalCash = totalCash.total_cash + (quantity * purchasePrice);
  
      await updateTotalCash(client, user_id, newTotalCash);
      await client.query('COMMIT');
  
      res.json({ newTotalCash: formatCash(newTotalCash) });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error selling item from inventory:', error);
      res.status(500).json({ error: 'Error selling item from inventory', details: error.message });
    } finally {
      client.release();
    }
  });
  
// Helper Functions
// get inventory item
const getInventoryItem = async (client, userId, fruitId) => {
  const query = `
    SELECT quantity, purchase_price 
    FROM inventory 
    WHERE user_id = $1 AND fruit_id = $2
    ORDER BY purchase_price ASC
  `;
  const result = await client.query(query, [userId, fruitId]);
  return result.rows[0];
};
// update inventory
const updateInventory = async (client, userId, fruitId, updatedQuantity) => {
  const query = `
    UPDATE inventory 
    SET quantity = $1 
    WHERE user_id = $2 AND fruit_id = $3;
  `;
  await client.query(query, [updatedQuantity, userId, fruitId]);
};
// delete inventory item
const deleteInventoryItem = async (client, userId, fruitId) => {
  const query = `
    DELETE FROM inventory 
    WHERE user_id = $1 AND fruit_id = $2;
  `;
  await client.query(query, [userId, fruitId]);
};
//get user cash
const getTotalCash = async (client, userId) => {
  const query = `
    SELECT total_cash 
    FROM "user" 
    WHERE id = $1;
  `;
  const result = await client.query(query, [userId]);
  return result.rows[0];
};
// update user cash
const updateTotalCash = async (client, userId, newTotalCash) => {
  const query = `
    UPDATE "user" 
    SET total_cash = $1 
    WHERE id = $2;
  `;
  await client.query(query, [parseFloat(newTotalCash).toFixed(2), userId]);
};



module.exports = router;
