import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory } from './sagas/inventorySaga';

const TotalValue = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const calculateTotal = () => {
    return Object.values(inventory).reduce((total, fruit) => 
      total + fruit.quantity * fruit.purchase_price, 0
    ).toFixed(2);
  };

  const calculateAveragePrice = () => {
    const totalFruits = Object.values(inventory).reduce((sum, fruit) => sum + fruit.quantity, 0);
    if (totalFruits === 0) return 'N/A';
    const totalValue = Object.values(inventory).reduce((sum, fruit) => 
      sum + fruit.quantity * fruit.purchase_price, 0
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

export default TotalValue;
