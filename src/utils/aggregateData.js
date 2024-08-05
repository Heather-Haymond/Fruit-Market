export const groupByFruitId = (inventory) => {
  if (!Array.isArray(inventory)) {
    return [];
      }

  const grouped = {};
  inventory.forEach((fruitItem, index) => {
    const { inventory_id, fruit_id, fruit_name, purchase_price, current_price, quantity } = fruitItem;
    // console.log("Processing fruitItem:", fruitItem);
    // console.log("Type of fruit_id:", typeof fruit_id);
    // console.log("Value of fruit_id:", fruit_id);
    // console.log("Type of fruit_name:", typeof fruit_name);
    // console.log("Value of fruit_name:", fruit_name);

    if (fruit_id === undefined || fruit_id === null) {
      console.error("Invalid fruit_id:", fruit_id);
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
// console.log(" grouping:", typeof inventory);
  return Object.values(grouped);
};
