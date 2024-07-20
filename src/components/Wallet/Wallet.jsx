import React from "react";
import { useSelector } from 'react-redux';

const Wallet = () => {
  const user = useSelector((state) => state.user);

  const totalCash = parseFloat(user.total_cash).toFixed(2)
  ? parseFloat(user.total_cash).toFixed(2) 
  : '0.00';

  return (
    <div>
      <h3>Wallet</h3>
      <p>Total Cash: ${ totalCash }</p>
    </div>
  );
};

export default Wallet;
