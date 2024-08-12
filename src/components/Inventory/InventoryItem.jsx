import React, { useState } from "react";
import SellButton from "./SellButton";

const InventoryItem = React.memo(({ fruit, user, currentUser }) => {
  const { id: userId } = user || {};
  const { id: currentUserId } = currentUser || {};
  const {
    id: fruitId,
    purchase_price,
    inventory_id,
    current_price,
    quantity: initialQuantity = 1,
    potential_profit_loss,
  } = fruit || {};

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

  const [quantity, setQuantity] = useState(initialQuantity);
  const isOwner = userId === currentUserId;

  // Calculate profit/loss for a single item
  const profitLoss = current_price - purchase_price;
  const formattedProfitLoss = profitLoss.toFixed(2);

   // Calculate percentage
  const profitLossPercentage = Math.round(((current_price - purchase_price) / purchase_price * 100));


  // const handleQuantityChange = (e) => {
  //   const newQuantity = Number(e.target.value);
  //   if (newQuantity >= 1) {
  //     setQuantity(newQuantity);
  //   }
  // };

  
  return (
    <div className="inventory-item">
      <span>{fruit.name}</span>
      <span> Price Purchased: ${purchase_price.toFixed(2)}</span>
      {/* <span> Potential Profit/Loss: ${potential_profit_loss}</span> /}
      {/ <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        placeholder="Quantity"
      /> /}
      {/ Selling Price: ${fruit.current_price ? Number(fruit.current_price).toFixed(2) : 'N/A'} /}
      {/ Potential Profit/Loss: ${item.potential_profit_loss}  */}
      {isOwner && (
        <>
          <SellButton
            fruit_id={fruitId}
            purchase_price={Number(purchase_price)}
            current_price={Number(current_price)}
            user_id={userId}
            inventory_id={inventory_id}
            quantity={quantity}
            text="Sell"
          />
           <div style={{ fontSize: "0.975rem", color: "#222",  }}>
            Potential{" "}
            {formattedProfitLoss < 0 ? (
              <span style={{ 
                color: "red",
                fontWeight: "bold",
                textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
               }}>Loss</span>
            ) : (
              <span
              style={{
                fontWeight: "bold",
                color: "gold",
                textShadow: "1px 1px 0 #333, -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333"
              }}
            > 
           Gains
            </span>
            )}
            ${Math.abs(formattedProfitLoss)} ({profitLossPercentage}%)
          </div>
        </>
      )}
    </div>
  );
});

export default InventoryItem;