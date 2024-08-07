const { pool } = require('../db/pool'); 
const { getInventoryItem, getTotalCash, updateTotalCash, updateInventory, deleteInventoryItem, formatCash } = require('../db/helpers'); // Adjust paths as necessary

async function processSellTransaction(user_id, fruit_id, quantity, current_price, inventory_id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get the inventory item
    const inventoryItem = await getInventoryItem(client, inventory_id);

    if (!inventoryItem) {
      throw new Error('Inventory item not found');
    }
    if (inventoryItem.user_id !== user_id) {
      throw new Error('Inventory item does not belong to the user');
    }
    if (inventoryItem.quantity <= 0) {
      throw new Error('Item quantity is zero or negative');
    }

    // Use current price for the sale
    const currentPrice = parseFloat(current_price);
    if (isNaN(currentPrice)) {
      throw new Error('Invalid current price');
    }

    // Calculate updated quantity
    const updatedQuantity = inventoryItem.quantity - quantity;
    
    if (updatedQuantity < 0) {
      throw new Error("Not enough quantity available");
    }

    // Calculate total sale value based on provided currentPrice
    const totalSaleValue = currentPrice * quantity;
       
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

    await client.query('COMMIT');

    return { newTotalCash: formatCash(newTotalCash) };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error processing sell transaction:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = processSellTransaction;
