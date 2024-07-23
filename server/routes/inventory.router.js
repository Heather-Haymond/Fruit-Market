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

// GET inventory data for a specific user
router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const result = await pool.query(
      `SELECT i.*, f.*
       FROM "inventory" i
       JOIN "fruits" f ON i."fruit_id" = f."id"
       WHERE i."user_id" = $1`,
      [userId]
    );

    const formattedRows = result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      fruitId: row.fruit_id,
      name: row.fruit_name,
      quantity: row.quantity,
      purchasePrices: [parseFloat(row.purchase_price)], 
      totalQuantity: row.quantity 
    }));

    res.json(formattedRows.rows);
  } catch (error) {
    console.error("Error fetching inventory data for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// //buy
// router.post('/buy', async (req, res) => {
//   const { user_id, fruit_id, quantity, purchase_price } = req.body;

//   if (!user_id || !fruit_id || !quantity || !purchase_price) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }
//   const formattedPrice = parseFloat(purchase_price).toFixed(2);
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN");
//     const inventoryResult = await client.query(
//       `INSERT INTO inventory (user_id, fruit_id, quantity, purchase_price) 
//        VALUES ($1, $2, $3, $4) 
//        RETURNING *`,
//       [user_id, fruit_id, quantity, formattedPrice]
//     );
//     const totalPurchasePrice = (quantity * parseFloat(purchase_price)).toFixed(
//       2
//     );
//     const currentCashResult = await client.query(
//       'SELECT total_cash FROM "user" WHERE id = $1',
//       [user_id]
//     );
//     const currentCash = parseFloat(currentCashResult.rows[0].total_cash) || 0;
//     const newTotalCash = (currentCash - parseFloat(totalPurchasePrice)).toFixed(
//       2
//     );

//     if (parseFloat(newTotalCash) < 0) {
//       throw new Error("Insufficient funds");
//     }
//     await client.query('UPDATE "user" SET total_cash = $1 WHERE id = $2', [
//       newTotalCash,
//       user_id,
//     ]);
//     await client.query("COMMIT");

//     res.status(201).json({
//       inventory: inventoryResult.rows[0],
//       newTotalCash: newTotalCash,
//     });
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.error("Error buying fruit:", error);
//     res.status(500).json({ error: "Failed to buy fruit" });
//   }
// });
// //sell
// router.post("/sell", async (req, res) => {
//   const { user_id, fruit_id, quantity } = req.body;

//   if (!user_id || !fruit_id || !quantity || quantity <= 0) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//   const userId = parseInt(user_id, 10);
//   const fruitId = parseInt(fruit_id, 10);
//   const qty = parseInt(quantity, 10);

//   if (isNaN(userId) || isNaN(fruitId) || isNaN(qty)) {
//     return res.status(400).json({ error: "Invalid input values" });
//   }
  
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN");

//     const inventoryQuery = `
//   SELECT quantity, purchase_price 
//   FROM inventory 
//   WHERE user_id = $1 AND fruit_id = $2
//   ORDER BY purchase_price ASC
// `;
//     const inventoryResult = await client.query(inventoryQuery, [
//       user_id,
//       fruit_id,
//     ]);

//     const inventoryItem = inventoryResult.rows[0];
//     const updatedQuantity = inventoryItem.quantity - quantity;

//     if (updatedQuantity > 0) {
//       const updateInventoryQuery = `
//         UPDATE inventory 
//         SET quantity = $1 
//         WHERE user_id = $2 AND fruit_id = $3;
//       `;
//       await client.query(updateInventoryQuery, [
//         updatedQuantity,
//         user_id,
//         fruit_id,
//       ]);
//     } else {
//       const deleteInventoryQuery = `
//         DELETE FROM inventory 
//         WHERE user_id = $1 AND fruit_id = $2;
//       `;
//       await client.query(deleteInventoryQuery, [user_id, fruit_id]);
//     }
//     const totalCashQuery = `
//       SELECT total_cash 
//       FROM "user" 
//       WHERE id = $1;
//     `;

//     const totalCashResult = await client.query(totalCashQuery, [user_id]);

//     if (totalCashResult.rows.length === 0) {
//       throw new Error("User not found");
//     }

//     const purchasePrice = parseFloat(inventoryItem.purchase_price);
//     const totalCash = parseFloat(totalCashResult.rows[0].total_cash);
//     const newTotalCash = totalCash + (quantity * purchasePrice);

//     const updateCashQuery = `
//       UPDATE "user" 
//       SET total_cash = $1 
//       WHERE id = $2;
//     `;
//     await client.query(updateCashQuery, [newTotalCash.toFixed(2), user_id]);

//     await client.query("COMMIT");

//     console.log(
//       `User ${user_id} sold ${quantity} of fruit ${fruit_id} for ${
//         quantity * purchasePrice
//       }. New balance: ${newTotalCash}`
//     );
//     res.sendStatus(200).json({ newTotalCash: newTotalCash });
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.error("Error selling item from inventory:", error);
//     if (!res.headersSent) 
//     res.status(500).json({ error: "Error selling item from inventory" });
//   } finally {
//     client.release();
//   }
// });

// //total quantity and average purchase price for each fruit owned by each user.
// router.get("/aggregated", async (req, res) => {
//   const query = `
//     SELECT 
//       u.username,
//       f.name AS fruit_name,
//       SUM(i.quantity) AS total_quantity,
//       AVG(i.purchase_price) AS average_purchase_price
//     FROM inventory i
//     JOIN "user" u ON i.user_id = u.id
//     JOIN fruits f ON i.fruit_id = f.id
//     GROUP BY u.username, f.name;
//   `;

//   try {
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching aggregated inventory data:", error);
//     res.sendStatus(500);
//   }
// });

module.exports = router;
