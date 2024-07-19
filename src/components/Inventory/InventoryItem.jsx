import React from "react";
import SellButton from "../SellButton/SellButton";

const InventoryItem = ({ fruit, onSell }) => {
  return (
    <div className="inventory-item">
      <h3>{fruit.name}</h3>
      <ul>
        {fruit.purchasePrices.map((price, index) => (
          <li key={index}>
            Total Quantity: {fruit.quantity}, 
            Price: ${price.toFixed(2)}
            <SellButton onClick={() => onSell(index)} text="Sell" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
