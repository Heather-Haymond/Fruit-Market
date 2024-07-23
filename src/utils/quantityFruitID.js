function calculateQuantityById(fruits) {
  const grouped = fruits.reduce((grouped, fruit) => {
    if (!grouped[fruit.fruit_id]) {
      grouped[fruit.fruit_id] = { fruit_id: fruit.fruit_id, quantity: 0 };
    }
    grouped[fruit.fruit_id].quantity += fruit.quantity;
    return grouped;
  }, {});
  return Object.values(grouped);
}

module.exports = {
    calculateQuantityById
  };