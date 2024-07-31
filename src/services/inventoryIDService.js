const getInventoryId = async (userId, fruitId) => {
    try {
      const response = await fetch(`/api/inventoryId/${userId}/${fruitId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch inventory ID');
      }
      const data = await response.json();
      return data.inventory_id;
    } catch (error) {
      console.error('Error fetching inventory ID:', error);
      throw error;
    }
  };
  
  export { getInventoryId };
  