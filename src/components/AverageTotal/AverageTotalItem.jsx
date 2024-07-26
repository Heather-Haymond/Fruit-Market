import React from 'react';
import { groupByFruitId } from '../../utils/aggregateData';

const AverageTotalItem = ({ fruitGroup }) => {
  return (
    <div className="average-total-item">
      <h3>{fruitGroup.name}</h3>
      <ul>
        <li>Average Purchase Price: ${fruitGroup.averagePurchasePrice}</li>
        <li>Total Purchase Price: ${fruitGroup.totalPurchasePrice.toFixed(2)}</li>
        <li>Total Quantity: {fruitGroup.totalQuantity}</li>
      </ul>
    </div>
  );
};

export default AverageTotalItem;
