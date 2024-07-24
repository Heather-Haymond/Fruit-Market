import React from "react";
import SellButton from "../SellButton/SellButton";

const InventoryItem = ({ fruit, user }) => {
  console.log("Received fruit data:", fruit);
  console.log("Received user data:", user);

  if (!user || !user.id) {
    console.error('User is not defined or user.id is missing in InventoryItem');
    return <div>Error: User is not defined</div>;
  }
  
  // if (!Array.isArray(fruit.items)) {
  //   console.error(' is not an array in InventoryItem:', fruit);
  //   return <div>Error: Invalid purchase prices data</div>;
  // }

  return (
    <div className="inventory-item">
      <ul>
          <li>
            Price: ${fruit.purchase_price.toFixed(2)}
            <SellButton 
              fruit_id={fruit.id} 
              purchase_price={fruit.purchase_price} 
              user_id={user.id}  
              text="Sell" 
            />
          </li>
      </ul>
    </div>
  );
};

export default InventoryItem;
