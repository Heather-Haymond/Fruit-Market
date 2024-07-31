import React from 'react';
import { useDispatch } from 'react-redux';


const SellButton = ({fruit_id, user_id, inventory_id, quantity,  purchase_price, }) => {
  const dispatch = useDispatch();

  const handleSell = () => {
    console.log('Props passed to SellButton:', {
      fruit_id,
      user_id,
      inventory_id,
      quantity,
      purchase_price,
    });

    if (fruit_id > 0 && user_id) {
      dispatch({
        type: "SELL_FRUIT",
        payload: {
          fruit_id,
          user_id,
          inventory_id,
          quantity,
          purchase_price,
        },
      });
    } else {
      console.error("Invalid values passed to SellButton", {
        fruit_id,
        user_id,
        inventory_id,
        quantity,
        purchase_price,
      });
    }
  };
  return <button onClick={handleSell}>Sell</button>;
};

export default SellButton;
