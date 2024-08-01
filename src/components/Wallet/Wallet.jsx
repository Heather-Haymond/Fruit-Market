import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import AverageTotal from "./AverageTotal";

const Wallet = () => {
  const user = useSelector((state) => state.user);

  const totalCash = parseFloat(user.total_cash).toFixed(2)
    ? parseFloat(user.total_cash).toFixed(2)
    : "0.00";

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Wallet
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Total Cash: ${totalCash}</Typography>
      </Paper>
      <AverageTotal />
    </Box>
  );
};

export default Wallet;
