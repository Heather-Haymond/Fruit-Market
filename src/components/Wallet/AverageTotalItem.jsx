import React from 'react';


const AverageTotalItem = ({ fruitGroup }) => {
  if (!fruitGroup) {
    return <div>Error: No fruit group data available</div>;
  }
  return (
    <div className="average-total-item">
      <h3>{fruitGroup.name}</h3>
      <ul>
        <li>Average Purchase Price: ${fruitGroup.averagePurchasePrice}</li>
        <li>Total Purchase Price: ${fruitGroup.totalPurchasePrice.toFixed(2)}</li>
        <li> Quantity: {fruitGroup.totalQuantity}</li>
      </ul>
    </div>
  );
};

export default AverageTotalItem;
