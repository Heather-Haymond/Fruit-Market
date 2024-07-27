import React from "react";
import { useSelector } from "react-redux";
import useUserInventory from "../hooks/useUserInventory";
import Inventory from "../Inventory/Inventory";

const UserInventory = () => {
  const inventory = useUserInventory();
  const user = useSelector((state) => state.user);

  return (
    <div className="container">
      <h2>{user.username}'s Inventory</h2>
      <Inventory inventory={inventory} />
    </div>
  );
};

export default UserInventory;
