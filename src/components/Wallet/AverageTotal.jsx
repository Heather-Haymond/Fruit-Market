import React from "react";
import useUserInventory from "../../hooks/useUserInventory";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { groupByFruitId } from "../../utils/aggregateData";
import AverageTotalItem from "./AverageTotalItem";

const AverageTotal = () => {
  const { inventory, error } = useUserInventory();
  console.log("Inventory:", inventory);

  if (error) return <div>Error: {error}</div>;

  if (!Array.isArray(inventory)) {
    console.error("Expected inventory to be an array:", inventory);
    return <div>Error: Inventory data is not in the expected format</div>;
  }

  const groupedInventory = groupByFruitId(inventory);

  return (
    <Box sx={{ padding: 3 }}>
       <Box
        sx={{
          backgroundColor:  '#009688',
          padding: 2,
          borderRadius: 1, // rounded corners
          display: 'inline-block',
          minWidth: '500px', 
        }}
      >
     <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: 'white',
          textShadow: '2px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
        }}
      >
        Average Total Summary
      </Typography>
      {groupedInventory.length > 0 ? (
        <>
          {groupedInventory.map((fruitGroup) => (
            <Paper key={fruitGroup.id} sx={{ padding: 2, marginBottom: 2 }}>
              <AverageTotalItem fruitGroup={fruitGroup} />
            </Paper>
          ))}
          <Box sx={{ marginTop: 3, padding: 2, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h6" gutterBottom>
              Total Inventory Value: $
            
              {groupedInventory
                .reduce(
                  (total, fruitGroup) => total + fruitGroup.totalPurchasePrice,
                  0
                )
                .toFixed(2)}
                </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body1">
            </Typography>
            <Typography variant="body1">
              Average Price per Fruit $
              {(() => {
                const totalFruits = groupedInventory.reduce(
                  (sum, fruitGroup) => sum + fruitGroup.totalQuantity,
                  0
                );
                if (totalFruits === 0) return "N/A";
                const totalValue = groupedInventory.reduce(
                  (sum, fruitGroup) =>
                    sum +
                    parseFloat(fruitGroup.averagePurchasePrice) *
                      fruitGroup.totalQuantity,
                  0
                );
                return (totalValue / totalFruits).toFixed(2);
              })()}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography>No inventory data available</Typography>
      )}
    </Box>
    </Box>
  );
};

export default AverageTotal;
