import React, { useState, useEffect } from "react";
import useUserInventory from "../../hooks/useUserInventory";
import { groupByFruitId } from "../../utils/aggregateData";
import InventoryItem from "./InventoryItem";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  
} from "@mui/material";

const UserInventory = () => {
  const { inventory, error } = useUserInventory();
  const currentUser = useSelector((state) => state.user);

  if (error) return <div>Error: {error}</div>;
  if (!inventory || inventory.length === 0) return <div>Loading...</div>;

  const groupedInventory = groupByFruitId(inventory);

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
                      purchase_price: item.purchase_price,
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
