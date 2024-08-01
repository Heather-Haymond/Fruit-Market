import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import useUserInventory from '../../hooks/useUserInventory';
import { groupByFruitId } from '../../utils/aggregateData';
import { useSelector } from 'react-redux';


const InventoryChart = () => {
  const { inventory, error } = useUserInventory();
  const currentUser = useSelector((state) => state.user);

  if (error) return <div>Error: {error}</div>;
  if (!inventory || inventory.length === 0) return <div>Loading...</div>;

  const groupedInventory = groupByFruitId(inventory);

  const fruitsPrices = groupedInventory.map(group => ({
    name: group.name,
    prices: group.items.map(item => item.purchase_price)
  }));

  // Create labels based on item indexes
  const maxItems = Math.max(...fruitsPrices.map(fruit => fruit.prices.length));
  const labels = Array.from({ length: maxItems }, (_, index) => `Item ${index + 1}`);

  // Create chart data
  const chartData = {
    labels: labels,
    datasets: fruitsPrices.map((fruit, index) => ({
      label: fruit.name,
      data: fruit.prices,
      borderColor: `rgba(${index * 50}, ${index * 75}, 192, 1)`,
      backgroundColor: `rgba(${index * 50}, ${index * 75}, 192, 0.2)`,
      fill: false,
    }))
  };
  
  return (
    <div>
      <h3>Inventory Price Trends</h3>
      <Line data={chartData} />
    </div>
  );
};

export default InventoryChart;
