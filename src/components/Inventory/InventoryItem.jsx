import React, { useState } from "react";
import SellButton from "./SellButton";

const InventoryItem = React.memo(({ fruit, user, currentUser }) => {
  const { id: userId } = user || {};
  const { id: currentUserId } = currentUser || {};
  const {
    id: fruitId,
    purchase_price,
    inventory_id,
    last_purchase_price,
    quantity: initialQuantity = 1,
  } = fruit || {};

  const [quantity, setQuantity] = useState(initialQuantity);


  // console.log("User ID:", user.id);
  // console.log("Received fruit data:", fruit);
  // console.log("Received user data:", user);

  if (!userId) {
    console.error("User is not defined or user.id is missing in InventoryItem");
    return <div>Error: User is not defined</div>;
  }

  if (!fruitId) {
    console.error("Fruit data is missing or invalid in InventoryItem");
    return <div>Error: Fruit data is invalid</div>;
  }

  if (!currentUserId) {
    console.error(
      "Current user is not defined or currentUser.id is missing in InventoryItem"
    );
    return <div>Error: Current user is not defined</div>;
  }

  // const handleQuantityChange = (e) => {
  //   const newQuantity = Number(e.target.value);
  //   if (newQuantity >= 1) {
  //     setQuantity(newQuantity);
  //   }
  // };


  const isOwner = userId === currentUserId;
  return (
    <div className="inventory-item">
      <span>{fruit.name}</span>
      {/* <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        placeholder="Quantity"
      /> */}
      Price: ${purchase_price.toFixed(2)}
      {isOwner && (
        <SellButton
          fruit_id={fruitId}
          purchase_price={Number(purchase_price)}
          last_purchase_price={last_purchase_price} 
          user_id={userId}
          inventory_id={inventory_id}
          quantity={quantity}
          text="Sell"
        />
      )}
    </div>
  );
});

export default InventoryItem;
