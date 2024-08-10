
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import useUserInventory from "../../hooks/useUserInventory";
import useCurrentPrices from "../../hooks/useCurrentPrices";
import { groupByFruitId } from "../../utils/aggregateData";
import useGainsOrLoss from "../../hooks/useGainsOrLoss";
import InventoryItem from "./InventoryItem";

import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Box,

} from "@mui/material";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeWords = (string) => {
  return string
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
};

const replaceUnderscoreWithSpace = (string) => {
  return string.replace(/_/g, " ");
};

const UserInventory = () => {
  const dispatch = useDispatch();
  const { inventory, error } = useUserInventory();
  const { currentPrices, loading: pricesLoading, error: pricesError } = useCurrentPrices();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_CURRENT_PRICES' });
  }, [dispatch]);

  useEffect(() => {
  }, [currentPrices, inventory]);

  if (error) return <div>Error: {error}</div>;
  if (pricesError) return <div>Error loading prices: {pricesError}</div>;
  if (!inventory ) return <div>Loading...</div>;

  const gainsOrLossData = useGainsOrLoss(inventory, currentPrices);
  const groupedInventory = groupByFruitId(inventory);
  // console.log("Current Prices:", currentPrices);
  // console.log("Grouped Inventory:", groupedInventory);
  return (
    <Container>
       <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: 'white',
          textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
        }}
      >
        Your Inventory
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center', 
          gap: 4, 
        }}
      >
      {gainsOrLossData.map((group) => (
        <Card
        key={group.fruit_id}
        variant="outlined"
        sx={{
          mb: 2, 
          backgroundColor: 'green', 
          borderColor: 'secondary.main',
          color: 'white', 
          padding: 2, 
          width: '40%', 

        }}
      >
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
            {replaceUnderscoreWithSpace(capitalizeWords(group.fruit_name))}
            </Typography>
            <Typography>Current Selling Price: ${group.current_market_price}</Typography>
            <List>
              {group.items.map((item) => (
                <ListItem key={item.inventory_id}>
                  <InventoryItem
                    fruit={{
                      id: group.fruit_id,
                      name: replaceUnderscoreWithSpace(capitalizeWords(group.fruit_name)),
                      purchase_price: item.purchase_price,
                      current_price: group.current_market_price,
                      inventory_id: item.inventory_id,
                      potential_profit_loss: item.potential_profit_loss,
                      quantity: item.quantity,
                    }}
                    user={{ id: currentUser.id }}
                    currentUser={currentUser}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="body2" color="text.secondary">
              Average Purchase Price: ${group.average_purchase_price}
            </Typography>
          </CardContent>
        </Card>
      ))}
      </Box>
    </Container>
  );
};

export default UserInventory;
