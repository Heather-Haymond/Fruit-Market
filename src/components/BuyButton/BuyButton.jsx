import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BuyButton = ({ fruit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleBuyFruit = () => {
    const purchasePrice = fruit.current_price;
    const userId = user.id;
    dispatch({
      type: "BUY_FRUIT",
      payload: { fruitId: fruit.id, quantity: 1, purchasePrice, userId },
    });
  };

  return <button onClick={handleBuyFruit}>Buy</button>;
};

export default BuyButton;


