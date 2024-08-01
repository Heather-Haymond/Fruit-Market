import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Typography, Box } from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Box
      component="form"
      onSubmit={registerUser}
      sx={{ maxWidth: 400, mx: "auto", p: 2 }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, .6)",
          border: "2px solid black",
          borderRadius: 1,
          padding: .5,
          textAlign: "center", 
          mb: 2,
          height: '20px', 
          maxWidth: '250px',
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto',
        
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "black",
            fontSize: '1.25rem',
          }}
        >
          Register User
        </Typography>
      </Box>
      {errors.registrationMessage && (
        <Typography variant="h6" color="error" gutterBottom>
          {errors.registrationMessage}
        </Typography>
      )}
      <Box mb={2}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
          InputProps={{
            sx: {
              fontWeight: "bold",
              color: "black",
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: 1,
              "& .MuiInputBase-input": {
                fontWeight: "bold",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              fontWeight: "bold",
              color: "black",
            },
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            sx: {
              fontWeight: "bold",
              color: "black",
              backgroundColor: "white",
              border: "2px solid black",

              "& .MuiInputBase-input": {
                fontWeight: "bold",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              fontWeight: "bold",
              color: "black",
            },
          }}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#c0ca33",
          color: "#000",
          "&:hover": {
            backgroundColor: "#f4d03f",
            color: "#000",
          },
          mb: 1,
        }}
        fullWidth
      >
        Register
      </Button>
    </Box>
  );
}

export default RegisterForm;
