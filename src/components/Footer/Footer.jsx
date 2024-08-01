import React from 'react';
import './Footer.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 128, 0, 1)',
        color: 'primary.contrastText',
        padding: .5,
      }}
    >
      <Typography variant="body2">&copy; Ripe and Ready</Typography>
    </Box>
  );
}

export default Footer;
