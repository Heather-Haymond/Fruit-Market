import React, { useMemo } from "react";
import InventoryItem from "./InventoryItem";
import useFetchInventory from "../../hooks/useFetchInventory";
import { groupByFruitId } from "../../utils/aggregateData";
import { useSelector } from "react-redux";

const Inventory = () => {
  const user = useSelector((state) => state.user);
  const { inventory = [], error } = useFetchInventory();

  // console.log('User in Inventory:', user);
  // console.log("inventory is an", typeof inventory);
  if (inventory && inventory.length > 0) {
    // console.log('Type of purchase_price for first item:', typeof inventory[0]?.purchase_price);
  }

  if (error) return <div>Error: {error}</div>;
  if (!inventory) return <div>Loading...</div>;

  const groupedInventory = useMemo(() => {
    return Array.isArray(inventory) ? groupByFruitId(inventory) : [];
  }, [inventory]);

  return (
    <div>
      <h3>Inventory Basket</h3>
      {groupedInventory.length > 0 ? (
        groupedInventory.map((group) => (
          <div key={group.id} className="category">
            <h4>{group.name}</h4>
            {group.items.map((fruit, index) => (
              <InventoryItem
                key={fruit.id || index} 
                fruit={{
                  id: group.id,
                  name: group.name,
                  purchase_price: Number(fruit.purchase_price).toFixed(2),
                  last_purchase_price: group.lastPurchasePrice,
                  inventory_id: fruit.inventory_id,
                  quantity: fruit.quantity
                }}
                user={user}
              />
            ))}
          </div>
        ))
      ) : (
        <p>No items in inventory</p>
      )}
    </div>
  );
};

export default Inventory;

// const getFruitQuantities = (inventory) => {
//   if (!Array.isArray(inventory)) {
//     console.error("Expected inventory to be an array but got:", inventory);
//     return {}; // Return an empty object if inventory is not an array
//   }
//   const quantities = {};
//   inventory.forEach((item) => {
//     if (quantities[item.fruit_id]) {
//       quantities[item.fruit_id] += item.quantity;
//     } else {
//       quantities[item.fruit_id] = item.quantity;
//     }
//   });
//   return quantities;
// };

// const fruitQuantities = Array.isArray(inventory) ? getFruitQuantities(inventory) : {};

// (Quantity: {fruitQuantities[fruit.id] || 0})

{
  /* Total Quantity: {fruit.totalQuantity || 'N/A'}, -- taked out of aggregatedData */
}
