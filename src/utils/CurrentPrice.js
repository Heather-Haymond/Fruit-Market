export const fetchCurrentPrices = async () => {
    try {
      const response = await fetch('/api/fruits/current-prices');
      if (!response.ok) {
        throw new Error('Failed to fetch current prices');
      }
      const data = await response.json();
      
      // Transform the array of objects into an object with fruit_id as keys
      const pricesObject = data.reduce((acc, item) => {
        acc[item.fruit_id] = item.current_price;
        return acc;
      }, {});
  
      return pricesObject;
    } catch (error) {
      console.error('Error fetching current prices:', error);
      throw error;
    }
  };