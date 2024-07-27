const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// // GET all inventory (not grouped)
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         i.id AS inventory_id,
//         u.id AS user_id,
//         u.username,
//         f.id AS fruit_id,
//         f.name AS fruit_name,
//         i.quantity,
//         i.purchase_price
//       FROM
//         inventory i
//       JOIN
//         "user" u ON i.user_id = u.id
//       JOIN
//         fruits f ON i.fruit_id = f.id;
//     `);

//     const formattedRows = result.rows.map(row => ({
//       inventory_id: row.inventory_id,
//       user_id: row.user_id,
//       username: row.username,
//       fruit_id: row.fruit_id,
//       fruit_name: row.fruit_name,
//       quantity: row.quantity,
//       purchase_price: parseFloat(row.purchase_price)
//     }));
//     console.log('Formatted Rows:', formattedRows);
//     res.json(formattedRows);
//   } catch (error) {
//     console.error('Error fetching inventory:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Function to group inventory by user
const groupByUser = (rows) => {
  const grouped = {};

  rows.forEach((item) => {
    const { user_id, username, fruit_id, fruit_name, purchase_price, quantity } = item;

    if (!grouped[user_id]) {
      grouped[user_id] = {
        user_id,
        username,
        inventory: []
      };
    }

    grouped[user_id].inventory.push({
      fruit_id,
      fruit_name,
      quantity,
      purchase_price: parseFloat(purchase_price) || 0
    });
  });

  return Object.values(grouped);
};



// GET all users inventory

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(` 
  SELECT  
    i.id AS inventory_id, 
    u.id AS user_id,  
    u.username, 
    f.id AS fruit_id,  
    f.name AS fruit_name, 
    i.quantity, 
    i.purchase_price 
  FROM  
    inventory i 
  JOIN  
    "user" u ON i.user_id = u.id 
  JOIN  
    fruits f ON i.fruit_id = f.id; 
  `);

    // Format and group inventory data by user ID
    const groupedInventory = groupByUser(result.rows);
    res.json(groupedInventory);
  } catch (error) {
    console.error("Error fetching all users inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Fetch inventory for specific a user
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      `SELECT 
          f.id AS fruit_id, 
          f.name AS fruit_name, 
          i.quantity, 
          i.purchase_price
       FROM inventory i
       JOIN fruits f ON i.fruit_id = f.id
       WHERE i.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user inventory:", error);
    res.status(500).json({ error: "Failed to fetch user inventory" });
  }
});

module.exports = router;


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
