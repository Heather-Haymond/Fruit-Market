import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import registerImage from '../../images/registerImage.png';

function RegisterPage() {
  const history = useHistory();

  return (
    <Box
    sx={{
      height: '100vh',
      backgroundImage: `url(${registerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  > 
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

        <Box sx={{ 
          marginTop: .5,
          backgroundColor: "rgba(255, 255, 255, .6)",
          borderRadius: 1,
          padding: .5,
          // textAlign: "center", 
          mb: .5,
          height: '30px', 
          maxWidth: '250px',
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center',
           }}>
          <Typography variant="h6">Already have an account?</Typography>
        </Box>
        <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/login')}
            sx={{ marginTop: .5 }} 
          >
            Login
          </Button>
      </Box>
    </Container>
    </Box>
  );
}

export default RegisterPage;
