export const groupByFruitId = (inventory) => {
  const grouped = {};
  inventory.forEach((fruitItem) => {
    const { fruit_id, name, purchase_price } = fruitItem;
    console.log("Processing fruitItem:", fruitItem);
    if (!grouped[fruit_id]) {
      grouped[fruit_id] = {
        id: fruit_id,
        name,
        purchasePrices: [],
      };
    }
    const numericPrice = Number(purchase_price);
    if (!isNaN(numericPrice)) {
      grouped[fruit_id].purchasePrices.push(numericPrice);
    } else {
      console.error("Invalid purchase_price:", purchase_price);
    }
  });
  console.log("Grouped Inventory:", grouped);
  return Object.values(grouped);
};
