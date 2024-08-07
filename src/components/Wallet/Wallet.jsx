import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import AverageTotal from "./AverageTotal";
import { createSelector } from "reselect";

// Memoized selector for total cash
const selectTotalCash = createSelector(
  (state) => state.user.total_cash,
  (total_cash) => (total_cash ? parseFloat(total_cash).toFixed(2) : "0.00")
);
const Wallet = () => {
  const totalCash = useSelector(state => state.user.total_cash);

  return (
    <Paper elevation={3}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Wallet
        </Typography>
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6">Total Cash: ${totalCash}</Typography>
        </Paper>
        <AverageTotal />
      </Box>
    </Paper>
  );
};

export default Wallet;
