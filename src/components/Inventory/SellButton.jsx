import React from 'react';
import { useDispatch } from 'react-redux';


const SellButton = ({fruit_id, user_id, inventory_id, quantity,  current_price}) => {
  const dispatch = useDispatch();

  const handleSell = () => {
    // Convert current_price to a number
    console.log('Type of current_price:', typeof current_price); // expected: 'number'
    console.log('Current Price (raw):', current_price); 4//expected: Raw value
    const numericPrice = parseFloat(current_price);
    console.log('Type of numericPrice:', typeof numericPrice); // expected: 'number'
    console.log('Current Price (numeric):', numericPrice); // expected: Numeric conversion

    if (isNaN(numericPrice) || numericPrice <= 0) {
      console.error("Invalid current price:", numericPrice);
      return;
    }

    console.log('Exact values being sent to server:', {
      fruit_id,
      user_id,
      inventory_id,
      quantity,
      current_price: numericPrice.toFixed(2),
    });

    if (fruit_id > 0 && user_id) {
      dispatch({
        type: "SELL_FRUIT",
        payload: {
          fruit_id,
          user_id,
          inventory_id,
          quantity,
          current_price: Number(current_price).toFixed(2),
        },
      });
    } else {
      console.error("Invalid values passed to SellButton", {
        fruit_id,
        user_id,
        inventory_id,
        quantity,
        current_price: Number(current_price).toFixed(2),
      });
    }
  };
  return <button onClick={handleSell}>Sell</button>;
};

export default SellButton;
