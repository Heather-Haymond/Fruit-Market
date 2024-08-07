import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Box, Typography, Paper, Divider } from '@mui/material';
import useFetchAllInventories from '../../hooks/useFetchAllInventories';
import useCurrentPrices from '../../hooks/useCurrentPrices'; 
import { groupByFruitId } from "../../utils/aggregateData"; 
import InventoryItem from './InventoryItem';

const AllUsersInventory = ({ currentUser }) => {
  const [inventory, setInventory] = useState([]);
  const dispatch = useDispatch();
  const { inventories, error: inventoriesError } = useFetchAllInventories();
  const { currentPrices, error: pricesError, loading: pricesLoading } = useCurrentPrices();

  useEffect(() => {
    dispatch({ type: 'FETCH_CURRENT_PRICES' });
  }, [dispatch]);

  useEffect(() => {
    if (!currentPrices || Object.keys(currentPrices).length === 0) {
      dispatch({ type: 'FETCH_CURRENT_PRICES' });
    }
  }, [dispatch, currentPrices]);

  if ( inventoriesError || pricesError) return <div>Error: { inventoriesError || pricesError}</div>;
  if (!inventories || inventories.length === 0 || pricesLoading) return <div>Loading...</div>;

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
                  {group.items.map((item, index) => {
                    // Generate a unique key using a combination of identifiers
                    const key = `item-${group.id}-${item.inventory_id || index}-${item.purchase_price}`;

                    return (
                      <InventoryItem 
                      key={key} 
                      fruit={{ 
                        id: group.id,
                        purchase_price: item.purchase_price,
                        inventory_id: item.inventory_id,
                        current_price: currentPrices[group.id],
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
