import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BuyButton = ({ fruit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleBuyFruit = () => {
    const purchasePrice = parseFloat(fruit.current_price);
    const userId = user.id;

     if (isNaN(purchasePrice) || purchasePrice < 0.5) {
      console.error('Invalid purchase price. It must be at least $0.50.');
      return;
    }
    
    dispatch({
      type: "BUY_FRUIT",
      payload: { fruitId: fruit.id, quantity, purchasePrice, userId },
    });
  };

  return <button onClick={handleBuyFruit}>Buy</button>;
};

export default BuyButton;


