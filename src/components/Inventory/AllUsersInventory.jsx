import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import useFetchAllInventories from '../../hooks/useFetchAllInventories';
import { groupByFruitId } from "../../utils/aggregateData"; 
import InventoryItem from './InventoryItem';

const AllUsersInventory = ({ currentUser }) => {
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
    acc[userInventory.user_id].inventory.push(...userInventory.inventory || []);

    return acc;
  }, {});

  return (
    <Box sx={{ padding: 2 }}>
    <Typography variant="h3" gutterBottom>All Users' Inventories</Typography>
      {Object.values(groupedByUser).map((user) => {
         console.log("Rendering user:", user);
        const groupedInventory = groupByFruitId(user.inventory);
        return (
          <Paper key={`user-${user.id}`} sx={{ padding: 2, marginBottom: 2 }}>
             <Typography variant="h4">User: {user.username}</Typography>
            <Divider sx={{ my: 2 }} />
            {Object.values(groupedInventory).length > 0 ? (
              Object.values(groupedInventory).map((group) => (
                <Box key={`group-${group.id}`}sx={{ marginBottom: 2 }}>
                  <Typography variant="h5">{group.name}</Typography>
                  <Typography>Average Purchase Price: ${group.averagePurchasePrice}</Typography>
                  {group.items.map((item) => {
                    // Ensure unique key assignment
                    const key = item.inventory_id 
                      ? `item-${item.inventory_id}` 
                      : `user-${user.id}-group-${group.id}-index-${Math.random()}`;

                    if (!item.inventory_id) {
                      console.log('Inventory item with undefined inventory_id:', item);
                    }
                    return (
                      <InventoryItem 
                      key={key} 
                      fruit={{ 
                        id: group.id,
                        purchase_price: item.purchase_price,
                        inventory_id: item.inventory_id 
                      }}
                      user={{ id: user.id }} 
                      currentUser={currentUser}
                    />
                    
                    );
                  })}
                 </Box>
              ))
            ) : (
              <p>No items in inventory</p>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default AllUsersInventory;
