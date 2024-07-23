import React from 'react';
import useFetchInventory from '../../hooks/useFetchInventory';


const AverageTotal = () => {
  const { inventory, error } = useFetchInventory();
  // console.log('Inventory:', inventory);

  if (error) return <div>Error: {error}</div>;

  const calculateTotal = () => {
    return inventory.reduce((total, fruit) => 
      total + fruit.total_quantity * fruit.average_purchase_price, 0
    ).toFixed(2);
  };

  const calculateAveragePrice = () => {
    const totalFruits = inventory.reduce((sum, fruit) => sum + fruit.quantity, 0);
    if (totalFruits === 0) return 'N/A';
    const totalValue = inventory.reduce((sum, fruit) => 
      sum + fruit.total_quantity * fruit.average_purchase_price, 0
    );
    return (totalValue / totalFruits).toFixed(2);
  };

  return (
    <div>
      <p>Total Inventory Value: ${calculateTotal()}</p>
      <p>Average Price per Fruit: ${calculateAveragePrice()}</p>
    </div>
  );
};

export default AverageTotal;
