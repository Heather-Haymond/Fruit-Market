export const groupByFruitId = (inventory) => {
  if (!Array.isArray(inventory)) {
    console.error('Expected inventory to be an array:', inventory);
  return {};
  }

  const grouped = {};
  inventory.forEach((fruitItem) => {
    const { inventory_id, fruit_id, fruit_name, purchase_price } = fruitItem;
    // console.log("Processing fruitItem:", fruitItem);
    // console.log("Type of fruit_id:", typeof fruit_id);
    // console.log("Value of fruit_id:", fruit_id);
    // console.log("Type of fruit_name:", typeof fruit_name);
    // console.log("Value of fruit_name:", fruit_name);
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
    if (!isNaN(numericPrice)) {
      grouped[fruit_id].items.push({
        purchase_price: numericPrice,
        inventory_id,
      });
      grouped[fruit_id].totalQuantity += 1; 
      grouped[fruit_id].totalPurchasePrice += numericPrice;
    } else {
      console.error("Invalid purchase_price:", purchase_price);
    }
  });

  
  // const groupedArray = Object.values(grouped);
  
  // Calculate the average purchase price for each fruit group
  Object.values(grouped).forEach((group) => {
    group.averagePurchasePrice = (group.totalPurchasePrice / group.totalQuantity).toFixed(2);
  });
// console.log(" grouping:", typeof inventory);
  return Object.values(grouped);
};
