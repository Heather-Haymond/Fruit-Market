const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Buy Route
router.post('/buy', async (req, res) => {
  const { user_id, fruit_id, quantity, purchase_price } = req.body;

  if (!user_id || !fruit_id || !quantity || !purchase_price || quantity <= 0 || purchase_price <= 0) {
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

// Convert purchase_price to a numeric value
const numericPurchasePrice = parseFloat(purchase_price);
if (isNaN(numericPurchasePrice)) {
  return res.status(400).json({ error: 'Invalid purchase price' });
}

// Convert quantity to a numeric value
const numericQuantity = parseInt(quantity, 10);
if (isNaN(numericQuantity)) {
  return res.status(400).json({ error: 'Invalid quantity' });
}
  const formattedPrice = numericPurchasePrice.toFixed(2);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert into inventory
    const inventoryResult = await client.query(
      `INSERT INTO inventory (user_id, fruit_id, quantity, purchase_price) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [user_id, fruit_id, numericQuantity, formattedPrice]
    );

    // Calculate the total purchase price
    const totalPurchasePrice = (numericQuantity* parseFloat(purchase_price)).toFixed(2);

    // Get current cash
    const currentCashResult = await client.query(
      'SELECT total_cash FROM "user" WHERE id = $1',
      [user_id]
    );
    const currentCash = parseFloat(currentCashResult.rows[0].total_cash) || 0;

    // Calculate new total cash
    let newTotalCash = currentCash - parseFloat(totalPurchasePrice);

    // Check for sufficient funds
    if (newTotalCash < 0) {
      throw new Error('Insufficient funds');
    }

     // If inventory is zero, reset cash to $100
    //  if (totalInventoryQuantity === 0) {
    //   newTotalCash = 100;
    // }

    // Update total cash
    await client.query(
      'UPDATE "user" SET total_cash = $1 WHERE id = $2',
      [newTotalCash.toFixed(2), user_id]
    );

    await client.query('COMMIT');

    const updatedUser = await client.query('SELECT * FROM "user" WHERE id = $1', [user_id]);
    
    res.status(201).json({
      inventory: inventoryResult.rows[0],
      newTotalCash: formatCash(newTotalCash),
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error buying fruit:', error);
    if (error.message === 'Insufficient funds') {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    res.status(500).json({ error: 'Failed to buy fruit', details: error.message });
  } finally {
    client.release();
  }
});

// Helper Functions-sell
const getInventoryItem = async (client, user_id, fruit_id) => {
  const res = await client.query( `
  SELECT * FROM inventory 
  WHERE user_id = $1 AND fruit_id = $2`, 
  [user_id, fruit_id]
  );
  return res.rows[0];
};

const updateInventory = async (client, user_id, fruit_id, quantity) => {
  await client.query(`
  UPDATE inventory 
  SET quantity = $1 
  WHERE user_id = $2 AND fruit_id = $3`, 
  [quantity, user_id, fruit_id]
  );
};

const deleteInventoryItem = async (client, user_id, fruit_id) => {
  await client.query( `
    DELETE FROM inventory
    WHERE user_id = $1 AND fruit_id = $2`,
    [user_id, fruit_id]
    );
};

const getTotalCash = async (client, user_id) => {
  const res = await client.query( `
    SELECT total_cash
    FROM "user"
    WHERE id = $1`,
    [user_id]
    );
  return res.rows[0];
};

const updateTotalCash = async (client, user_id, total_cash) => {
  await client.query( `
    UPDATE "user"
    SET total_cash = $1
    WHERE id = $2`,
    [total_cash, user_id]
    );
};


// Sell Route
router.post('/sell', async (req, res) => {
  console.log('Request body:', req.body);
  const { user_id, fruit_id, quantity } = req.body;

  if (!user_id || !fruit_id || !quantity || quantity <= 0) {
    console.error('Missing required fields');
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

        // Get the inventory item
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
    
        // Get the current cash
        const totalCash = await getTotalCash(client, user_id);
        const purchasePrice = parseFloat(inventoryItem.purchase_price);
    
        // Calculate new total cash
        let newTotalCash = parseFloat(totalCash.total_cash) + (quantity * purchasePrice);
    
        // Ensure cash is capped at $100
        newTotalCash = Math.min(newTotalCash, 100);
    
        // Update total cash
        await updateTotalCash(client, user_id, newTotalCash);
    
        await client.query('COMMIT');
        res.json({ newTotalCash: formatCash(newTotalCash) });

        const updatedUser = await client.query('SELECT * FROM "user" WHERE id = $1', [user_id]);
    
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error selling item from inventory:', error.stack);
        res.status(500).json({ error: 'Error selling item from inventory', details: error.message });
      } finally {
        client.release();
      }
    });
    

// Helper Functions
const formatCash = (cash) => {
  return `$${parseFloat(cash).toFixed(2)}`;
};


module.exports = router;
