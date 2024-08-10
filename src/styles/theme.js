import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green color
    },
    secondary: {
      main:'#2e7d32', 
    }
  },
  typography: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
  
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: '#3b9a7a', // Set all cards to this background color
      },
    },
  }
});

export default theme;
