import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as MuiLink,
  Box
} from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <MuiLink component={RouterLink} to="/home" color="inherit" underline="none">
            Fruit Market
            </MuiLink>
        </Typography>
        <Box>
          {/* If no user is logged in, show the login/register button */}
          {!user.id && (
            <Button color="inherit" component={RouterLink} to="/login">
              Login / Register
            </Button>
          )}
          {/* If a user is logged in, show navigation buttons */}
          {user.id && (
            <>
              <Button color="inherit" component={RouterLink} to="/user">
                Market
              </Button>
              <Button color="inherit" component={RouterLink} to="/info">
                Inventory
              </Button>
              <Button color="inherit" component={RouterLink} to="/about">
                Wallet
              </Button>
              <Button color="inherit" component={RouterLink} to="/chart">
                Graphs
              </Button>
              <LogOutButton />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
