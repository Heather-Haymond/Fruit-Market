import React from "react";
import SellButton from "../SellButton/SellButton";

const InventoryItem = ({ fruit, user }) => {
  if (!user || !user.id) {
    console.error('User is not defined or user.id is missing in InventoryItem');
    return <div>Error: User is not defined</div>;
  }
  if (!fruit || !Array.isArray(fruit.purchasePrices)) {
    console.error('Invalid fruit data in InventoryItem');
    return <div>Error: Invalid fruit data</div>;
  }
  return (
    <div className="inventory-item">
      <h3>{fruit.name}</h3>
      <ul>
        {fruit.purchasePrices.map((price, index) => (
          <li key={index}>
            Total Quantity: {fruit.quantity || 'N/A'}, 
            Price: ${price.toFixed(2)}
            <SellButton 
              fruit_id={fruit.id} 
              quantity={fruit.quantity}
              purchase_price={price} 
              user_id={user.id}  
              text="Sell" 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
