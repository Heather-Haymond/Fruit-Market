import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import AverageTotal from "./AverageTotal";
import { createSelector } from "reselect";
import walletImage from "../../images/walletImage.png";

// Memoized selector for total cash
const selectTotalCash = createSelector(
  (state) => state.user.total_cash,
  (total_cash) => (total_cash ? parseFloat(total_cash).toFixed(2) : "0.00")
);
const Wallet = () => {
  const totalCash = useSelector(selectTotalCash);
  console.log("Rendering Wallet - Total Cash:", totalCash);
  return (
    <Box
      sx={{
        backgroundImage: `url(${walletImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", 
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: 600, margin: "0 auto", padding: 2, backgroundColor:  '#b3e5fc', }}>
        <Typography variant="h4" gutterBottom>
          Wallet
        </Typography>
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6">Total Cash: ${totalCash}</Typography>
        </Paper>
        <AverageTotal />
      </Paper>
    </Box>
  );
};

export default Wallet;
