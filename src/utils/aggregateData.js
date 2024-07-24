export const groupByFruitId = (inventory) => {
  const grouped = {};
  inventory.forEach((fruitItem) => {
    const { inventory_id, fruit_id, fruit_name, purchase_price } = fruitItem;
    console.log("Processing fruitItem:", fruitItem);
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
      };
    }
    const numericPrice = Number(purchase_price);
    if (!isNaN(numericPrice)) {
      grouped[fruit_id].items.push({
        purchase_price: numericPrice,
        inventory_id,
      });
      grouped[fruit_id].totalQuantity += 1; 
    } else {
      console.error("Invalid purchase_price:", purchase_price);
    }
  });

  // Convert grouped object to an array of objects
  const groupedArray = Object.values(grouped);
  console.log("Array of grouped objects:", groupedArray);
  return groupedArray;
};
