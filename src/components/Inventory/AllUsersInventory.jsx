import React from 'react';
import useFetchAllInventories from '../../hooks/useFetchAllInventories';
import { groupByFruitId } from "../../utils/aggregateData"; 
import InventoryItem from './InventoryItem';

const AllUsersInventory = () => {
  const { inventories, error } = useFetchAllInventories();
  console.log("Fetched inventories:", inventories);

  if (error) return <div>Error: {error}</div>;
  if (!inventories || inventories.length === 0) return <div>Loading...</div>;

  const groupedByUser = inventories.reduce((acc, userInventory) => {
    console.log("userInventory:", userInventory);
    const inventory = Array.isArray(userInventory.inventory) ? userInventory.inventory : [];
    if (!acc[userInventory.user_id]) {
      acc[userInventory.user_id] = {
        id: userInventory.user_id,
        username: userInventory.username,
        inventory: []
      };
    }
    acc[userInventory.user_id].inventory.push(...inventory || []);

    return acc;
  }, {});

  return (
    <div>
      <h3>All Users' Inventories</h3>
      {Object.values(groupedByUser).map((user) => {
         console.log("Rendering user:", user);
        const groupedInventory = groupByFruitId(user.inventory);
        return (
          <div key={user.id}>
            <h4>User: {user.username}</h4>
            {Object.values(groupedInventory).length > 0 ? (
              Object.values(groupedInventory).map((group) => (
                <div key={group.id} className="category">
                  <h5>{group.name}</h5>
                  {group.items.map((item) => (
                    <InventoryItem 
                    key={item.id} 
                    fruit={item}
                    user={{ id: user.id }} 
                  />
                  ))}
                </div>
              ))
            ) : (
              <p>No items in inventory</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllUsersInventory;
