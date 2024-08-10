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
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
      }}
    >
      <Paper elevation={3} sx={{ 
        maxWidth: 600,
         margin: "0 auto",
        padding: 2,
        backgroundColor:  '#b3e5fc',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        border: '6px solid #009688',
        borderRadius: 2, // Optional: rounded corners for the Paper
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: adjust shadow if needed
      
        }}>
      <Box
        sx={{
          backgroundColor: '#009688', 
          padding: 2,
          borderRadius: 1, 
          display: 'inline-block', 
          minWidth: '500px', 
          textAlign: 'center',
        }}
      >
         <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: 'white',
          textShadow: '2px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black',
          position: 'absolute',
          top: 110, // Adjust the top spacing as needed
          left: 40, // Adjust the left spacing as needed
          zIndex: 1 // Ensure it's above other content
        }}
      >
        Wallet
      </Typography>
        <Paper sx={{ padding: 2, marginBottom: 0 }}>
          <Typography variant="h6">Total Cash: ${totalCash}</Typography>
        </Paper>
        </Box>
        <AverageTotal />
      </Paper>
    </Box>
  );
};

export default Wallet;
