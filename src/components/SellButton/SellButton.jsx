import React from 'react';
import { useDispatch } from 'react-redux';

const SellButton = ({ fruitId, index }) => {
  const dispatch = useDispatch();

  const handleSell = () => {
    dispatch({ type: 'SELL_FRUIT', payload: { fruitId, index } });
  };

  return (
    <button onClick={handleSell}>Sell</button>
  );
};

export default SellButton;
