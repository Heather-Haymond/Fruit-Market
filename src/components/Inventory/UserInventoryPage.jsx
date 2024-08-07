import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import useUserInventory from "../../hooks/useUserInventory";
import useCurrentPrices from "../../hooks/useCurrentPrices";
import { groupByFruitId } from "../../utils/aggregateData";
import InventoryItem from "./InventoryItem";

import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  
} from "@mui/material";

const UserInventory = () => {
  const dispatch = useDispatch();
  const { inventory, error } = useUserInventory();
  const { currentPrices, loading: pricesLoading, error: pricesError } = useCurrentPrices();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Dispatching FETCH_CURRENT_PRICES from UserInventory");
    dispatch({ type: 'FETCH_CURRENT_PRICES' });
  }, [dispatch]);

  useEffect(() => {
    console.log("Current Prices:", currentPrices);
    console.log("User Inventory:", inventory);
  }, [currentPrices, inventory]);

  if (error) return <div>Error: {error}</div>;
  if (pricesError) return <div>Error loading prices: {pricesError}</div>;
  if (!inventory ) return <div>Loading...</div>;

  const groupedInventory = groupByFruitId(inventory);
  console.log("Current Prices:", currentPrices);
  console.log("Grouped Inventory:", groupedInventory);
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Your Inventory
      </Typography>
      {groupedInventory.map((group) => (
        <Card key={group.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {group.name}
            </Typography>
            <List>
              {group.items.map((item) => (
                <ListItem key={item.inventory_id}>
                  <InventoryItem
                    fruit={{
                      id: group.id,
                      name: group.name,
                      purchase_price: item.purchase_price,
                      current_price: currentPrices[group.id],
                      inventory_id: item.inventory_id,
                    }}
                    user={{ id: currentUser.id }}
                    currentUser={currentUser}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="body2" color="text.secondary">
              Average Purchase Price: ${group.averagePurchasePrice}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default UserInventory;
