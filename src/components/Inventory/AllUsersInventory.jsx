import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import useFetchAllInventories from "../../hooks/useFetchAllInventories";
import useCurrentPrices from "../../hooks/useCurrentPrices";
import { groupByFruitId } from "../../utils/aggregateData";
import InventoryItem from "./InventoryItem";
import useGainsOrLoss from "../../hooks/useGainsOrLoss";

import allImage from "../../images/allInventory.png";
import paperBackgroundImage from "../../images/allCards.png";

const AllUsersInventory = ({ currentUser }) => {
  const [inventory, setInventory] = useState([]);
  const dispatch = useDispatch();
  const { inventories, error: inventoriesError } = useFetchAllInventories();
  const {
    currentPrices,
    error: pricesError,
    loading: pricesLoading,
  } = useCurrentPrices();
  const gainsOrLoss = useGainsOrLoss(inventories, currentPrices);

  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_PRICES" });
  }, [dispatch]);

  useEffect(() => {
    if (!currentPrices || Object.keys(currentPrices).length === 0) {
      dispatch({ type: "FETCH_CURRENT_PRICES" });
    }
  }, [dispatch, currentPrices]);

  if (inventoriesError || pricesError)
    return <div>Error: {inventoriesError || pricesError}</div>;
  if (!inventories || inventories.length === 0 || pricesLoading)
    return <div>Loading...</div>;

  const groupedByUser = inventories.reduce((acc, userInventory) => {
    console.log("userInventory:", userInventory);
    const inventory = Array.isArray(userInventory.inventory)
      ? userInventory.inventory
      : [];
    if (!acc[userInventory.user_id]) {
      acc[userInventory.user_id] = {
        id: userInventory.user_id,
        username: userInventory.username,
        inventory: [],
      };
    }
    acc[userInventory.user_id].inventory.push(
      ...(userInventory.inventory || [])
    );

    return acc;
  }, {});

  return (
    <Box
      sx={{
        padding: 2,
        backgroundImage: `url(${allImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "white",
          textShadow:
            "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
        }}
      >
        All Users' Inventories
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {Object.values(groupedByUser).map((user) => {
          console.log("Rendering user:", user);
          const groupedInventory = groupByFruitId(user.inventory);
          return (
            <Paper
              key={`user-${user.id}`}
              sx={{
                padding: 2,
                marginBottom: 2,
                maxWidth: 300,
                flex: "1 1 300px",
                backgroundImage: `url(${paperBackgroundImage})`, // Set the Paper background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                border: "6px solid #4CAF50", // Outline around the Paper
                borderRadius: 2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 9)",
              }}
            >
              <Typography variant="h4">User: {user.username}</Typography>
              <Divider sx={{ my: 2 }} />
              {Object.values(groupedInventory).length > 0 ? (
                Object.values(groupedInventory).map((group) => (
                  <Box key={`group-${group.id}`} sx={{ marginBottom: 2 }}>
                    <Card
                      key={`group-${group.id}`}
                      sx={{
                        marginBottom: 3,
                        maxWidth: 550, // Set the maximum width for Card
                        mx: "auto", // Center the Card component
                      }}
                    >
                      <CardHeader
                        title={group.name}
                        subheader={`Average Purchase Price: $${group.averagePurchasePrice}`}
                        sx={{ backgroundColor: "#4CAF50", color: "white" }}
                      />
                      <CardContent>
                        {group.items.map((item, index) => {
                          const key = `item-${group.id}-${
                            item.inventory_id || index
                          }-${item.purchase_price}`;
                          return (
                            <Box key={key} sx={{ marginBottom: 2,  marginTop: 0 }}>
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
                            </Box>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </Box>
                ))
              ) : (
                <p>No items in inventory</p>
              )}
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default AllUsersInventory;
