import React from 'react';

const InventoryItem = ({ fruitName, quantity, averagePrice, purchasePrices, onSell }) => {
  return (
    <div className="inventory-item">
      <h3>{fruitName}</h3>
      <p>Total Quantity: {quantity}</p>
      <p>Average Price: ${averagePrice.toFixed(2)}</p>
      <ul>
        {purchasePrices.map((price, index) => (
          <li key={index}>
            Price: ${price.toFixed(2)}
            <button onClick={() => onSell(index)}>Sell</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
