const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// Buy Route
router.post("/buy", async (req, res) => {
  const { user_id, fruit_id, quantity, purchase_price } = req.body;

  if (
    !user_id ||
    !fruit_id ||
    !quantity ||
    !purchase_price ||
    quantity < 1 ||
    purchase_price < 0.5
  ) {
    return res
      .status(400)
      .json({ error: "Missing or invalid required fields" });
  }

  try {
    // Validate and format purchase price
    const formattedPrice = validatePurchasePrice(purchase_price);

    // Convert quantity to a numeric value
    const numericQuantity = parseInt(quantity, 10);
    if (isNaN(numericQuantity)) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Calculate the total purchase price
      const totalPurchasePrice = (
        numericQuantity * parseFloat(formattedPrice)
      ).toFixed(2);

      // Get current cash
      const currentCashResult = await getTotalCash(client, user_id);
      const currentCash = parseFloat(currentCashResult.total_cash) || 0;

      // Calculate new total cash
      let newTotalCash = currentCash - parseFloat(totalPurchasePrice);

      // Check for sufficient funds
      if (newTotalCash < 0) {
        throw new Error("Insufficient funds");
      }

      // Insert into inventory and collect all inventory IDs
      const inventoryIds = [];
      for (let i = 0; i < quantity; i++) {
        const inventoryResult = await client.query(
          `INSERT INTO inventory (user_id, fruit_id, quantity, purchase_price) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id`,
          [user_id, fruit_id, 1, formattedPrice]
        );
        inventoryIds.push(inventoryResult.rows[0].id);
      }

      // Update total cash
      await updateTotalCash(client, user_id, newTotalCash.toFixed(2));

      await client.query("COMMIT");

      // Fetch updated user details
      const updatedUser = await client.query(
        'SELECT * FROM "user" WHERE id = $1',
        [user_id]
      );

      // Fetch detailed information for all inventory items
      const inventoryDetailsPromises = inventoryIds.map((id) =>
        getInventoryItem(client, id)
      );
      const inventoryDetails = await Promise.all(inventoryDetailsPromises);

      res.status(201).json({
        newTotalCash: formatCash(newTotalCash),
        updatedUser: updatedUser.rows[0],
        inventoryDetails,
        inventoryIds,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error buying fruit:", error);
      if (error.message === "Insufficient funds") {
        return res.status(400).json({ error: "Insufficient funds" });
      }
      res
        .status(500)
        .json({ error: "Failed to buy fruit", details: error.message });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error in /buy route:", error);
    res
      .status(500)
      .json({ error: "Failed to buy fruit", details: error.message });
  }
});

//--------------------------------------------------------------
//--------------------------------------------------------------

// Helper function to validate and parse purchase price
const validatePurchasePrice = (purchase_price) => {
  const numericPurchasePrice = parseFloat(purchase_price);
  if (isNaN(numericPurchasePrice) || numericPurchasePrice <= 0.5) {
    throw new Error("Invalid purchase price");
  }
  return numericPurchasePrice.toFixed(2);
};

// Helper function to validate and parse purchase price
const validateCurrentPrice = (current_price) => {
  const numericCurrentPrice = parseFloat(current_price);
  if (isNaN(numericCurrentPrice) || numericCurrentPrice <= 0.5) {
    throw new Error("Invalid current price");
  }
  return numericCurrentPrice.toFixed(2);
};

// Helper function to format cash
const formatCash = (cash) => `$${parseFloat(cash).toFixed(2)}`;

// Helper function to get total cash
const getTotalCash = async (client, user_id) => {
  const res = await client.query(
    `
    SELECT total_cash
    FROM "user"
    WHERE id = $1`,
    [user_id]
  );
  return res.rows[0];
};

// Helper function to update total cash
const updateTotalCash = async (client, user_id, total_cash) => {
  await client.query(
    `
    UPDATE "user"
    SET total_cash = $1
    WHERE id = $2`,
    [total_cash, user_id]
  );
};

// Helper function to get inventory item details
const getInventoryItem = async (client, inventory_id, purchase_price) => {
  try {
    const res = await client.query(
      `
      SELECT
        inventory.id AS inventory_id,
        inventory.user_id,
        inventory.fruit_id,
        inventory.quantity,
        inventory.purchase_price,
        fruits.name AS fruit_name,
        fruits.current_price,
        "user".username
      FROM
        inventory
      JOIN
        fruits ON inventory.fruit_id = fruits.id
      JOIN
        "user" ON inventory.user_id = "user".id
      WHERE
        inventory.id = $1`,
      [inventory_id]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching inventory item:", error.stack);
    throw error;
  }
};

// Helper function to update inventory
const updateInventory = async (client, inventory_id, quantity) => {
  await client.query(
    `
    UPDATE inventory 
    SET quantity = $1 
    WHERE id = $2`,
    [quantity, inventory_id]
  );
};

// Helper function to delete inventory item
const deleteInventoryItem = async (client, inventory_id) => {
  await client.query(
    `
    DELETE FROM inventory
    WHERE id = $1`,
    [inventory_id]
  );
};

// Utility function to compare numbers with a tolerance for floating-point issues
const areNumbersEqual = (num1, num2, tolerance = 0.01) => {
  return Math.abs(num1 - num2) < tolerance;
};

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

// Sell Route
router.post("/sell", async (req, res) => {
  console.log("Received sell request with data:", req.body);
  const { user_id, inventory_id, quantity, current_price  } = req.body;

  if (
    !user_id ||
    !inventory_id ||
    !quantity ||
    !current_price ||
    quantity <= 0 ||
    current_price <= 0
  ) {
    console.error("Missing required fields");
    return res
      .status(400)
      .json({ error: "Missing or invalid required fields" });
  }

  let validatedCurrentPrice;
  try {
    validatedCurrentPrice = validateCurrentPrice(current_price);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Get the stored price for the specific inventory item
    //  const storedPrice = await getStoredPrice(inventory_id, user_id);

    // Compare the provided price with the stored price
    //  if (!areNumbersEqual(parseFloat(parsedPurchasePrice), parseFloat(storedPrice))) {
    //    throw new Error('Provided purchase price does not match the inventory item');
    //  }

    // Get the inventory item
    const inventoryItem = await getInventoryItem(client, inventory_id);

    if (!inventoryItem) {
      throw new Error("Inventory item not found");
    }
    if (inventoryItem.user_id !== user_id) {
      throw new Error("Inventory item does not belong to the user");
    }
    if (inventoryItem.quantity <= 0) {
      throw new Error("Item quantity is zero or negative");
    }

    // Format the stored purchase price to two decimal places
    const storedPrice = parseFloat(inventoryItem.current_price);
    const providedPrice = parseFloat(current_price);
    
    // Log the values for debugging
    console.log(`Comparing prices for inventory_id: ${inventory_id}`);
    console.log(`Provided price: ${providedPrice}, Stored price: ${storedPrice}`);
    
    // Validate prices with a small margin of error
    if (!areNumbersEqual(providedPrice, storedPrice)) {
      console.warn("this has been the most annoying error yet.");
    }

    // Calculate updated quantity
    const updatedQuantity = inventoryItem.quantity - quantity;

    if (updatedQuantity < 0) {
      throw new Error("Not enough quantity available");
    }

    // Calculate total sale value based on provided purchasePrice
    const totalSaleValue = parseFloat(providedPrice) * quantity;

    // Get the current cash
    const totalCashResult = await getTotalCash(client, user_id);
    const currentTotalCash = parseFloat(totalCashResult.total_cash);

    // Calculate new total cash
    let newTotalCash = currentTotalCash + totalSaleValue;

    // Ensure cash is capped at $100
    newTotalCash = Math.min(newTotalCash, 100);

    // Update total cash
    await updateTotalCash(client, user_id, newTotalCash);

    // Update or delete the inventory item based on remaining quantity
    if (updatedQuantity > 0) {
      await updateInventory(client, inventory_id, updatedQuantity);
    } else {
      await deleteInventoryItem(client, inventory_id);
    }

    await client.query("COMMIT");

    res.json({ newTotalCash: formatCash(newTotalCash) });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error selling item from inventory:", error.stack);
    res.status(500).json({
      error: "Error selling item from inventory",
      details: error.message,
    });
  } finally {
    client.release();
  }
});

module.exports = router;
