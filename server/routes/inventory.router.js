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
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

  const inventoryQuery = `
  SELECT quantity, purchase_price 
  FROM inventory 
  WHERE user_id = $1 AND fruit_id = $2
  LIMIT 1;
`;
    const inventoryResult = await client.query(inventoryQuery, [user_id, fruit_id]);

    if (inventoryResult.rows.length === 0) {
      throw new Error("Fruit not found in inventory");
    }

    const inventoryItem = inventoryResult.rows[0];
    const updatedQuantity = inventoryItem.quantity - quantity;

    if (updatedQuantity > 0) {
      const updateInventoryQuery = `
        UPDATE inventory 
        SET quantity = $1 
        WHERE user_id = $2 AND fruit_id = $3;
      `;
      await client.query(updateInventoryQuery, [updatedQuantity, user_id, fruit_id]);
    } else {
      const deleteInventoryQuery = `
        DELETE FROM inventory 
        WHERE user_id = $1 AND fruit_id = $2;
      `;
      await client.query(deleteInventoryQuery, [user_id, fruit_id]);
    }
    const totalCashQuery = `
    SELECT total_cash 
    FROM "user" 
    WHERE id = $1;
  `;

  const totalCashResult = await client.query(totalCashQuery, [user_id]);
    const totalCash = totalCashResult.rows[0].total_cash;
    const newTotalCash = parseFloat(totalCash) + (quantity * parseFloat(sellPrice));

    const updateCashQuery = `
      UPDATE "user" 
      SET total_cash = $1 
      WHERE id = $2;
    `;

    const purchasePriceResult = await pool.query(purchasePriceQuery, [user_id, fruit_id]);
    if (purchasePriceResult.rows.length === 0) {
      throw new Error("Fruit not found in inventory");
    }
    const purchasePrice = purchasePriceResult.rows[0].purchase_price;
    const inventoryQuantity = purchasePriceResult.rows[0].quantity;
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