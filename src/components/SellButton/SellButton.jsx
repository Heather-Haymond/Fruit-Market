import React from 'react';
import { useDispatch } from 'react-redux';


const SellButton = ({fruit_id, user_id }) => {
  const dispatch = useDispatch();

  const handleSell = () => {
    console.log('Props passed to SellButton:', {
      fruit_id,
      user_id,
      quantity: 1
    });

    if (fruit_id > 0 && user_id) {
      dispatch({
        type: "SELL_FRUIT",
        payload: {
          fruit_id,
          user_id,
          quantity: 1
        },
      });
    } else {
      console.error("Invalid values passed to SellButton", {
        fruit_id,
        user_id,
      });
    }
  };
  return <button onClick={handleSell}>Sell</button>;
};

export default SellButton;
