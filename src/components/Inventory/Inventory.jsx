import React, { useMemo } from "react";
import InventoryItem from "./InventoryItem";
import useFetchInventory from "../../hooks/useFetchInventory";
import { groupByFruitId } from "../../utils/aggregateData";
import { useSelector } from "react-redux";
import { Container, Typography, Paper, Grid } from '@mui/material';

const Inventory = () => {
  const user = useSelector((state) => state.user);
  const { inventory = [], error } = useFetchInventory();

  // console.log('User in Inventory:', user);
  // console.log("inventory is an", typeof inventory);
  if (inventory && inventory.length > 0) {
    // console.log('Type of purchase_price for first item:', typeof inventory[0]?.purchase_price);
  }

  if (error) return <div>Error: {error}</div>;
  if (!inventory) return <div>Loading...</div>;

  const groupedInventory = useMemo(() => {
    return Array.isArray(inventory) ? groupByFruitId(inventory) : [];
  }, [inventory]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Inventory Basket
      </Typography>
      {groupedInventory.length > 0 ? (
        <Grid container spacing={3}>
          {groupedInventory.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                  {group.name}
                </Typography>
                {group.items.map((fruit, index) => (
                  <InventoryItem
                    key={fruit.id || index} 
                    fruit={{
                      id: group.id,
                      name: group.name,
                      purchased_price: fruit.purchased_price,
                      current_price: fruit.current_price,
                      inventory_id: fruit.inventory_id,
                      quantity: fruit.quantity
                    }}
                    user={user}
                  />
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No items in inventory</Typography>
      )}
    </Container>
  );
};


export default Inventory;

// const getFruitQuantities = (inventory) => {
//   if (!Array.isArray(inventory)) {
//     console.error("Expected inventory to be an array but got:", inventory);
//     return {}; // Return an empty object if inventory is not an array
//   }
//   const quantities = {};
//   inventory.forEach((item) => {
//     if (quantities[item.fruit_id]) {
//       quantities[item.fruit_id] += item.quantity;
//     } else {
//       quantities[item.fruit_id] = item.quantity;
//     }
//   });
//   return quantities;
// };

// const fruitQuantities = Array.isArray(inventory) ? getFruitQuantities(inventory) : {};

// (Quantity: {fruitQuantities[fruit.id] || 0})

{
  /* Total Quantity: {fruit.totalQuantity || 'N/A'}, -- taked out of aggregatedData */
}
