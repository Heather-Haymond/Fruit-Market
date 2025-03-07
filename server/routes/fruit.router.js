const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const { calculateQuantityById } = require("../../src/utils/quantityFruitID");

// Route to get aggregated fruit quantities
router.get("/fruits/quantities", async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT fruit_id, quantity FROM inventory"
    );
    const fruits = result.rows;

    // Use the utility function to aggregate quantities
    const aggregatedQuantities = calculateQuantityById(fruits);

    res.json(aggregatedQuantities);
  } catch (error) {
    console.error("Error fetching fruit quantities:", error);
    res
      .status(500)
      .json({
        error: "Failed to fetch fruit quantities",
        details: error.message,
      });
  } finally {
    client.release();
  }
});

// Fetch inventory with fruit details
router.get("/inventory", async (req, res) => {
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
    console.error("Error fetching inventory with fruit details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update all fruit prices

router.put("/prices", async (req, res) => {
  const queryText = ` 
  UPDATE fruits  
  SET current_price = ( 
  CASE 
    WHEN (current_price + (0.01 + random() * 0.50) * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END))::numeric > 9.99  
    THEN 9.99 
    WHEN (current_price + (0.01 + random() * 0.50) * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END))::numeric < 0.50  
    THEN 0.50 
    ELSE LEAST( 
      GREATEST( 
        (current_price + (0.01 + random() * 0.50) * (CASE WHEN random() < 0.5 THEN -1 ELSE 1 END))::numeric, 
        0.50 
      ), 
      9.99 
    ) 
  END 
  )::numeric(10,2) 
  RETURNING id, name, current_price; 
  `;

  try {
    const result = await pool.query(queryText);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(`Error updating price for fruits`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all fruits
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM fruits WHERE current_price IS NOT NULL AND current_price > 0"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching fruits", error);
    res.sendStatus(500);
  }
});

// Fetch current prices of fruits
router.get("/prices", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id AS fruit_id, current_price FROM fruits"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching current prices", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
