export const groupByFruitId = (inventory) => {
    const grouped = {};
  
    inventory.forEach((fruitItem) => {
      const { fruit_id, name, purchase_price, quantity } = fruitItem;
  
      console.log('Processing fruitItem:', fruitItem);
  
      if (!grouped[fruit_id]) {
        grouped[fruit_id] = {
          id: fruit_id,
          name,
          purchasePrices: [],
          totalQuantity: 0, 
        };
      }
  
      const numericQuantity = Number(quantity);
      const numericPrice = Number(purchase_price);
  
      if (!isNaN(numericQuantity) && numericQuantity >= 0) {
        grouped[fruit_id].totalQuantity += numericQuantity; 
      } else {
        console.error('Invalid quantity:', quantity);
      }
  
      if (!isNaN(numericPrice)) {
        grouped[fruit_id].purchasePrices.push(numericPrice); // Ensure price is a number
      } else {
        console.error('Invalid purchase_price:', purchase_price);
      }
    });
  
    console.log('Grouped Inventory:', grouped);
  
    return Object.values(grouped);
  };