import React, { useState, useEffect } from "react";
import styles from "./Market.module.css";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import BuyButton from "../BuyButton/BuyButton";
import UserInventoryPage from "../Inventory/UserInventoryPage";
import ToggleButton from "../Inventory/ToggleButton";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import useCurrentPrices from "../../hooks/useCurrentPrices";

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
  const fruits = useSelector((state) => state.fruit.fruits);
  const { currentPrices, loading, error } = useCurrentPrices();
  const medianPrice = 5.25;

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    console.log(
      "Dispatching FETCH_FRUITS and FETCH_CURRENT_PRICES from Market"
    );
    dispatch({ type: "FETCH_FRUITS" });
    dispatch({ type: "FETCH_CURRENT_PRICES" });
  }, [dispatch]);

  useEffect(() => {
  }, [currentPrices, fruits]);
  // const handlePricesUpdate = (updatedPrices) => {
  //   dispatch({
  //     type: "SET_FRUIT",
  //     payload: updatedPrices,
  //   });
  // };

  if (error)
    return <Typography color="error">Error loading prices: {error}</Typography>;
  const hasFruits =
    fruits && typeof fruits === "object" && Object.keys(fruits).length > 0;

  const getPriceComparisonLabel = (price) => {
    if (price > medianPrice) {
      return(
        <>
          ...are <span style={{ color: "#8B0000" }}>OVER</span> the median price!!
        </>
      );
    } else if (price < medianPrice) {
      return (
        <>
          ...are <span style={{ color: "gold" }}>UNDER</span> the median price!!
        </>
      );
    } else {
      return "...are At the median price";
    }
  };

 
  // const handleQuantityChange = (fruitId, value) => {
  //   setQuantities(prevQuantities => ({
  //     ...prevQuantities,
  //     [fruitId]: value
  //   }));
  // };

  // console.log("Fruits:", fruits);
  console.log("Current Prices:", currentPrices);

  return (
    <Container className={styles.containerBackground}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          color: "white",
          textShadow:
          "2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 0px 0 black, 0px 2px 0 black, -2px 0px 0 black, 0px -2px 0 black",
        }}
      >
        Welcome, {user.username}!
      </Typography>

      {/* <p>Your ID is: {user.id}</p> */}
      {/* <Wallet /> */}
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "white",
          textShadow:
          "2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 0px 0 black, 0px 2px 0 black, -2px 0px 0 black, 0px -2px 0 black",
        }}
      >
        Fruit Market
      </Typography>

      {/* <FruitsList />  */}

      {hasFruits ? (
        <Grid container spacing={4}>
          {Object.entries(fruits).map(([key, fruit]) => {
            if (fruit && fruit.current_price != null) {
              // Check if fruit and current_price are not null
              const currentPrice =
                currentPrices[fruit.id] != null
                  ? currentPrices[fruit.id]
                  : fruit.current_price;
              if (currentPrice && !isNaN(parseFloat(currentPrice))) {
                const priceComparisonLabel = getPriceComparisonLabel(
                  parseFloat(currentPrice)
                );
                return (
                  <Grid item key={fruit.id} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        padding: 2,
                        width: "240px",
                        
                        
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {capitalizeFirstLetter(
                            replaceUnderscoreWithSpace(fruit.name || "")
                          )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {priceComparisonLabel}
                          {/* ID: {fruit.id} */}
                        </Typography>
                        <Typography
                          variant="body4"
                          className={styles.blackText}
                        >
                          Current Price: ${parseFloat(currentPrice).toFixed(2)}
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
                      <BuyButton
                          fruit={fruit}
                          quantity={quantities[fruit.id] || 1}
                        />
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

{
  /* <Inventory inventory={inventory}  */
}

{
  /* <ToggleButton
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
      } */
}

{
  /* <AverageTotal />  */
}

export default Market;
