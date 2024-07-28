import React, { useState, useEffect } from "react";
import useUserInventory from "../../hooks/useUserInventory";
import { groupByFruitId } from "../../utils/aggregateData"; 
import InventoryItem from './InventoryItem';
import { useSelector } from "react-redux";

const UserInventory = () => {
    const { inventory, error } = useUserInventory();
    const currentUser = useSelector((state) => state.user);

    if (error) return <div>Error: {error}</div>;
    if (!inventory || inventory.length === 0) return <div>Loading...</div>;
  
    const groupedInventory = groupByFruitId(inventory);
    

  return (
    <div>
      <h3>Your Inventory</h3>
      {groupedInventory.map((group) => (
        <div key={group.id}>
          <h4>{group.name}</h4>
          <ul>
            {group.items.map((item) => (
              <InventoryItem
                key={item.inventory_id}
                fruit={{ id: group.id, purchase_price: item.purchase_price, inventory_id: item.inventory_id }}
                user={{ id: currentUser.id }}
                currentUser={currentUser}
              />
            ))}
          </ul>
          <p>Average Purchase Price: ${group.averagePurchasePrice}</p>
        </div>
      ))}
    </div>
  );
};

export default UserInventory;
