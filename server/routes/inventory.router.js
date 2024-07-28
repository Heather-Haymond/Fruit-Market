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
router.get('/:userId', async (req, res) => {
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


