import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import BuyButton from "../BuyButton/BuyButton";
import UserInventoryPage from "../Inventory/UserInventoryPage";
import ToggleButton from "../Inventory/ToggleButton";
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, TextField} from '@mui/material';
import useCurrentPrices from '../../hooks/useCurrentPrices';

// import UserChart from '../Charts/UserChart';


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const replaceUnderscoreWithSpace = (string) => {
  return string.replace(/_/g, " ");
};

const Market = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fruits = useSelector((state) => state.fruit);
  const { currentPrices, loading, error } = useCurrentPrices();

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
     console.log("Dispatching FETCH_FRUITS and FETCH_CURRENT_PRICES from Market");
    dispatch({ type: "FETCH_FRUITS" });
    dispatch({ type: "FETCH_CURRENT_PRICES" });
  }, [dispatch]);

  useEffect(() => {
    console.log("Current Prices in Market:", currentPrices);
    console.log("Fruits in Market:", fruits);
  }, [currentPrices, fruits]);
  // const handlePricesUpdate = (updatedPrices) => {
  //   dispatch({
  //     type: "SET_FRUIT",
  //     payload: updatedPrices,
  //   });
  // };

  if (error) return <Typography color="error">Error loading prices: {error}</Typography>;
  const hasFruits =
    fruits && typeof fruits === "object" && Object.keys(fruits).length > 0;
    
    // const handleQuantityChange = (fruitId, value) => {
    //   setQuantities(prevQuantities => ({
    //     ...prevQuantities,
    //     [fruitId]: value
    //   }));
    // };

    console.log("Fruits:", fruits);
  console.log("Current Prices:", currentPrices);
  
  return (
    <Container>
       <Typography variant="h2" gutterBottom>
      Welcome, {user.username}!
      </Typography>

      {/* <p>Your ID is: {user.id}</p> */}
      {/* <Wallet /> */}
      <Typography variant="h3" gutterBottom>
      Fruit Market
      </Typography>

      {/* <FruitsList />  */}
      
      {hasFruits ? (
        <Grid container spacing={4}>
          {Object.entries(fruits).map(([key, fruit]) => {
            if (fruit && fruit.current_price != null) { // Check if fruit and current_price are not null
              const currentPrice = currentPrices[key] != null ? currentPrices[key] : fruit.current_price;
              if (!isNaN(parseFloat(currentPrice))) {
                return (
                  <Grid item key={key} xs={12} sm={6} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {capitalizeFirstLetter(replaceUnderscoreWithSpace(fruit.name || ""))}
                        </Typography>
                        <Typography variant="body2" className="black-text">
                          Price: ${parseFloat(currentPrice).toFixed(2)}
                        </Typography>
                      {/* <TextField
                        size="small"
                        label="Quantity"
                        type="number"
                        min="1"
                        value={quantities[key] || 1}
                        onChange={(e) => handleQuantityChange(key, e.target.value)}
                        variant="outlined"
                        sx={{ width: '80px', marginTop: '10px' }}
                        className="small-text-field"
                        InputLabelProps={{
                          style: { color: "black" },
                        }}
                        InputProps={{
                          style: { color: "black" },
                        }}
                      /> */}
                     </CardContent>
                      <CardActions>
                        <BuyButton fruit={fruit} quantity={quantities[key] || 1} />
                      </CardActions>
                    </Card>
                  </Grid>
                );
              }
            }
            return null;
          })}
        </Grid>
      ) : (
        <Typography>No fruits available</Typography>
      )}
      <UserInventoryPage currentUser={user} />
      <LogOutButton className="btn" />
    </Container>
      );
    };
    
      {/* <Inventory inventory={inventory}  */}

      {/* <ToggleButton
        isToggled={showAllUsersInventory}
        onToggle={() => setShowAllUsersInventory(!showAllUsersInventory)}
      />

      {showAllUsersInventory 
      //?
       (
        <AllUsersInventory />
       )
       //:
      // (
      //   // <UserInventory inventory={userInventory} />
      // )
      } */}

      {/* <AverageTotal />  */}
    

export default Market;
