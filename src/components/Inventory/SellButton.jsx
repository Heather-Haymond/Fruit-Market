import React from 'react';
import { useDispatch } from 'react-redux';


const SellButton = ({fruit_id, user_id, inventory_id, quantity,  purchase_price, last_purchase_price }) => {
  const dispatch = useDispatch();

  const handleSell = () => {
    console.log('Exact values being sent to server:', {
      fruit_id,
      user_id,
      inventory_id,
      quantity,
      purchase_price: Number(purchase_price).toFixed(2),
      last_purchase_price: Number(last_purchase_price).toFixed(2),
    });


    if (fruit_id > 0 && user_id) {
      dispatch({
        type: "SELL_FRUIT",
        payload: {
          fruit_id,
          user_id,
          inventory_id,
          quantity,
          purchase_price: Number(purchase_price).toFixed(2),
          last_purchase_price: Number(last_purchase_price).toFixed(2),
        },
      });
    } else {
      console.error("Invalid values passed to SellButton", {
        fruit_id,
        user_id,
        inventory_id,
        quantity,
        purchase_price: Number(purchase_price),
        last_purchase_price: Number(last_purchase_price).toFixed(2),

      });
    }
  };
  return <button onClick={handleSell}>Sell</button>;
};

export default SellButton;
