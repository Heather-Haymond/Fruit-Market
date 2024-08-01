import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh', 
          textAlign: 'center',
        }}
      >
        <RegisterForm />

        <Box sx={{ marginTop: .5 }}>
          <Typography variant="h6">Already have an account?</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/login')}
            sx={{ marginTop: .5 }} 
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
