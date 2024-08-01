import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import PriceUpdater from "./PriceUpdater";
import BuyButton from "../BuyButton/BuyButton";
import FruitsList from "../FruitsList/FruitsList";
import UserInventoryPage from "../Inventory/UserInventoryPage";
import ToggleButton from "../Inventory/ToggleButton";
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, TextField} from '@mui/material';
import FruitCard from "../FruitCard/FruitCard"; 
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
  // const inventory = useSelector((state) => state.inventory);
  const error = useSelector((state) => state.error);
  // const userInventory = useSelector((state) => state.userInventory);
  const allUsersInventories = useSelector((state) => state.allUsersInventories);
  // const [showAllUsersInventory, setShowAllUsersInventory] = useState(false);

  const [quantities, setQuantities] = useState({});

  const handlePricesUpdate = (updatedPrices) => {
    dispatch({
      type: "SET_FRUIT",
      payload: updatedPrices,
    });
  };

  useEffect(() => {
    // console.log("Dispatching FETCH_FRUITS");
    dispatch({ type: "FETCH_FRUITS" });
    // console.log("Fruits in MarketPlace:", fruits);
    // console.log("Type of fruits:", typeof fruits);
    // console.log("Is fruits an array?:", Array.isArray(fruits));
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const hasFruits =
    fruits && typeof fruits === "object" && Object.keys(fruits).length > 0;
    
    const handleQuantityChange = (fruitId, value) => {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [fruitId]: value
      }));
    };
  return (
    <Container>
       <Typography variant="h2" gutterBottom>
      Welcome, {user.username}!
      </Typography>

      {/* <p>Your ID is: {user.id}</p> */}
      <PriceUpdater onPricesUpdate={handlePricesUpdate} /> 
      {/* <Wallet /> */}
      <Typography variant="h3" gutterBottom>
      Fruit Market
      </Typography>

      {/* <FruitsList />  */}
      
      {error ? (
         <Typography color="error">Error: {error}</Typography>
      ) : hasFruits ? (
        <Grid container spacing={4}>
          {Object.entries(fruits).map(([key, fruit]) => {
            if (fruit && fruit.current_price && !isNaN(parseFloat(fruit.current_price))) {
              return (
                <Grid item key={key} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {capitalizeFirstLetter(replaceUnderscoreWithSpace(fruit.name || ""))}
                      </Typography>
                      <Typography variant="body2" className="black-text">
                        Price: ${parseFloat(fruit.current_price).toFixed(2)}
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
              return null;
            })}
         </Grid>
        ) : (
          <Typography>No fruits available</Typography>
        )}
        <UserInventoryPage currentUser={user} />
        {/* <UserChart/> */}
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
