const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");


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



// GET all users and their inventory
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

// Fetch inventory item by ID
router.get('/item/:inventoryId', async (req, res) => {
  const inventoryId = req.params.inventoryId;
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
      FROM inventory i
      JOIN "user" u ON i.user_id = u.id
      JOIN fruits f ON i.fruit_id = f.id
      WHERE i.id = $1
    `, [inventoryId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching inventory item by ID:", error);
    res.status(500).json({ error: "Failed to fetch inventory item" });
  }
});


module.exports = router;


