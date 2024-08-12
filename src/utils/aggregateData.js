export const groupByFruitId = (inventory) => {
  if (!Array.isArray(inventory)) {
    console.error("Expected an array for inventory, but received:", inventory);
    return [];
      }

  const grouped = {};
  inventory.forEach((fruitItem, index) => {
    const { inventory_id, fruit_id, fruit_name, purchase_price, current_price, quantity } = fruitItem;

    if (fruit_id === undefined || fruit_id === null) {
      console.error(`Item at index ${index} has an invalid fruit_id:`, fruitItem);
      return;
    }
    if (!grouped[fruit_id]) {
      grouped[fruit_id] = {
        id: fruit_id,
        name: fruit_name,
        items: [],
        totalQuantity: 0,
        totalPurchasePrice: 0,
      };
    }
    const numericPrice = Number(purchase_price);
    const numericQuantity = Number(quantity);
    if (!isNaN(numericPrice)) {
      grouped[fruit_id].items.push({
        purchase_price: numericPrice,
        current_price: current_price,
        inventory_id: inventory_id,
        quantity: numericQuantity,
      });
      grouped[fruit_id].totalQuantity += 1; 
      grouped[fruit_id].totalPurchasePrice += numericPrice;
      grouped[fruit_id].lastPurchasePrice = numericPrice;
    } else {
      console.error("Invalid purchase_price:", purchase_price);
    }
  });


  
  // Calculate the average purchase price for each fruit group
  Object.values(grouped).forEach((group) => {
    if (group.totalQuantity > 0) {
    group.averagePurchasePrice = (group.totalPurchasePrice / group.totalQuantity).toFixed(2);
  } else {
    group.averagePurchasePrice = "0.00";
  }
  });

  return Object.values(grouped);
};
//calculate all fruits quantity for a specific user
export const calculateTotalQuantity = (inventory) => {
  if (!Array.isArray(inventory)) {
    console.error("Expected an array for inventory, but received:", inventory);
    return 0;
  }

  return inventory.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
};

// returns an object
export const groupByFruitIdWithTotal = (inventory) => {
  const groupedInventory = groupByFruitId(inventory);
  const totalQuantityForUser = calculateTotalQuantity(inventory);

  return {
    groupedInventory,
    totalQuantityForUser,
  };
};