import React from "react";
import SellButton from "../SellButton/SellButton";

const InventoryItem = React.memo(({ fruit, user, currentUser }) => {

  // console.log("User ID:", user.id);
  // console.log("Received fruit data:", fruit);
  // console.log("Received user data:", user);

  if (!user || !user.id) {
    console.error('User is not defined or user.id is missing in InventoryItem');
    return <div>Error: User is not defined</div>;
  }

  if (!fruit || !fruit.id) {
    console.error('Fruit data is missing or invalid in InventoryItem');
    return <div>Error: Fruit data is invalid</div>;
  }

  if (!currentUser || !currentUser.id) {
    console.error('Current user is not defined or currentUser.id is missing in InventoryItem');
    return <div>Error: Current user is not defined</div>;
  }
  
  const isOwner = user.id === currentUser.id;
  return (
    <div className="inventory-item">
      <ul>
          <li>
            Price: ${fruit.purchase_price.toFixed(2)}
            {isOwner && <SellButton 
              fruit_id={fruit.id} 
              purchase_price={fruit.purchase_price} 
              user_id={user.id}  
              text="Sell" 
            />}
          </li>
      </ul>
    </div>
  );
});

export default InventoryItem;
