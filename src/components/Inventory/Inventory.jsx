import React from 'react';
import InventoryItem from './InventoryItem';
import useFetchInventory from '../../hooks/useFetchInventory';
import { useDispatch } from 'react-redux';

const Inventory = () => {
  const dispatch = useDispatch();
  const { inventory, error } = useFetchInventory();

  const handleSell = (fruitId, index) => {
    dispatch({ type: 'SELL_FRUIT', payload: { fruitId, index } });
  };
  
  if (error) return <div>Error: {error}</div>;

  const calculateAveragePrice = (purchasePrices) => {
    if (purchasePrices.length === 0) return 0;
    const total = purchasePrices.reduce((sum, price) => sum + price, 0);
    return total / purchasePrices.length;
  };
  console.log('Inventory:', inventory);
  console.log('Type of inventory:', typeof inventory);
  console.log('Is array?', Array.isArray(inventory));

  if (error) return <div>Error: {error}</div>;
  if (!inventory) return <div>Loading...</div>;
  if (!Array.isArray(inventory)) return <div>Invalid inventory data</div>;

  return (
    <div>
      {inventory.map((fruit) => (
        <InventoryItem
          key={fruit.fruitId}
          name={fruit.name.charAt(0).toUpperCase() + fruit.name.slice(1)}
          quantity={fruit.purchasePrices.length}
          averagePrice={calculateAveragePrice(fruit.purchasePrices)}
          purchasePrices={fruit.purchasePrices}
          onSell={(index) => handleSell(fruit.fruitId, index)}
        />
      ))}
    </div>
  );
};

export default Inventory;