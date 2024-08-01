import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
<Container
      sx={{
        height: '100vh', 
        backgroundImage: `url('/src/images/loginImage.png')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white
          border: '2px solid black',
          borderRadius: 1,
          padding: 2,
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <LoginForm />

        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)', // Transparent white
            border: '2px solid black',
            borderRadius: 1,
            padding: 1,
            textAlign: 'center',
            maxWidth: '250px',
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Don't have an account?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/registration')}
            sx={{
              marginTop: 1,
              width: '150px',
              backgroundColor: '#c0ca33',
              color: '#000',
              '&:hover': {
                backgroundColor: '#f4d03f',
                color: '#000',
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
