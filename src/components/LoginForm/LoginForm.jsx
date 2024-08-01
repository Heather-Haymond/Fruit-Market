import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Box, Typography, TextField, Button } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <Box
      component="form"
      onSubmit={login}
      sx={{ maxWidth: 400, mx: 'auto', p: 2, backgroundColor: 'rgba(255, 255, 255, 0.6)', border: '2px solid black', borderRadius: 1 }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'black', fontSize: '1.25rem', textAlign: 'center' }}
      >
        Login
      </Typography>
      {errors.loginMessage && (
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: 'center', mb: 2 }}
        >
          {errors.loginMessage}
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
              fontWeight: 'bold',
              color: 'black',
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: 1,
              '& .MuiInputBase-input': {
                fontWeight: 'bold',
              },
            },
          }}
          InputLabelProps={{
            sx: {
              fontWeight: 'bold',
              color: 'black',
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
              fontWeight: 'bold',
              color: 'black',
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: 1,
              '& .MuiInputBase-input': {
                fontWeight: 'bold',
              },
            },
          }}
          InputLabelProps={{
            sx: {
              fontWeight: 'bold',
              color: 'black',
            },
          }}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#c0ca33',
          color: '#000',
          '&:hover': {
            backgroundColor: '#f4d03f',
            color: '#000',
          },
          mb: 2,
          maxWidth: '150px', 
        }}
        fullWidth
      >
        Log In
      </Button>
    </Box>
  );
}


export default LoginForm;
