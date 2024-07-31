// src/utils/inventoryID.js
const pool = require('../../server/modules/pool'); // Adjust the path as needed

/**
 * Fetch the inventory ID based on userId and fruitId.
 * @param {number} userId - The ID of the user.
 * @param {number} fruitId - The ID of the fruit.
 * @returns {Promise<number>} - The inventory ID.
 */
const getInventoryId = async (userId, fruitId) => {
  try {
    const result = await pool.query(`
      SELECT id AS inventory_id
      FROM inventory
      WHERE user_id = $1 AND fruit_id = $2
    `, [userId, fruitId]);

    if (result.rows.length > 0) {
      return result.rows[0].inventory_id;
    } else {
      throw new Error('Inventory not found');
    }
  } catch (error) {
    console.error('Error fetching inventory ID:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

module.exports = { getInventoryId };



