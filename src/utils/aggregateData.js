export const groupByFruitId = (inventory) => {
  const grouped = {};
  inventory.forEach((fruitItem) => {
    const { fruit_id, fruit_name, purchase_price } = fruitItem;
    console.log("Processing fruitItem:", fruitItem);
    console.log("Type of name:", typeof fruit_name);
    console.log("Value of name:", fruit_name);
    if (!grouped[fruit_id]) {
      grouped[fruit_id] = {
        id: fruit_id,
        name: fruit_name,
        items: [],
      };
    }
    const numericPrice = Number(purchase_price);
    if (!isNaN(numericPrice)) {
      grouped[fruit_id].items.push({
        purchase_price: numericPrice,
      });
    } else {
      console.error("Invalid purchase_price:", purchase_price);
    }
  });

  // Convert grouped object to an array of objects
  const groupedArray = Object.values(grouped);
  console.log("Array of grouped objects:", groupedArray);
  return groupedArray;
};
