import React from 'react';
import InventoryItem from './InventoryItem';
import useFetchInventory from '../../hooks/useFetchInventory';
import { useDispatch, useSelector } from 'react-redux';

const groupByFruitId = (inventory) => {
  const grouped = {};
inventory.forEach((fruitItem) => {
    const { fruit_id, name, purchase_price } = fruitItem;
    if (!grouped[fruit_id]) {
      grouped[fruit_id] = {
        id: fruit_id,
        name,
        purchasePrices: [],
      };
    }
    grouped[fruit_id].purchasePrices.push(Number(purchase_price)); // Ensure 
  });
  return Object.values(grouped);
};

const Inventory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { inventory, error } = useFetchInventory();

  console.log('User in Inventory:', user);
  console.log('Inventory:', inventory);
  if (inventory && inventory.length > 0) {
    console.log('Type of purchase_price for first item:', typeof inventory[0]?.purchase_price);
  }

  if (error) return <div>Error: {error}</div>;
  if (!inventory) return <div>Loading...</div>;

  const groupedInventory = groupByFruitId(inventory);

  return (
    <div>
      <h3>Inventory Basket</h3>
      {groupedInventory.map((fruit) => (
        <div key={fruit.id} className="category">
        <InventoryItem
          fruit={fruit}  
          user={user} 
        />
      </div>
      ))}
    </div>
  );
};

export default Inventory;