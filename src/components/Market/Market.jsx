import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import Inventory from "../Inventory/Inventory";
import PriceUpdater from "../PriceUpdater/PriceUpdater";
import BuyButton from "../BuyButton/BuyButton";
import AverageTotal from '../AverageTotal/AverageTotal';
import FruitsList from '../FruitsList/FruitsList';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const replaceUnderscoreWithSpace = (string) => {
  return string.replace(/_/g, " ");
};
const getFruitQuantities = (inventory) => {
  if (!Array.isArray(inventory)) {
    console.error("Expected inventory to be an array but got:", inventory);
    return {}; // Return an empty object if inventory is not an array
  }
  const quantities = {};
  inventory.forEach((item) => {
    if (quantities[item.fruit_id]) {
      quantities[item.fruit_id] += item.quantity;
    } else {
      quantities[item.fruit_id] = item.quantity;
    }
  });
  return quantities;
};


const Market = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fruits = useSelector((state) => state.fruit);
  const inventory = useSelector((state) => state.inventory.inventory);
  const error = useSelector((state) => state.error);

  const handlePricesUpdate = (updatedPrices) => {
    dispatch({
      type: "SET_FRUIT",
      payload: updatedPrices,
    });
  };

  useEffect(() => {
    console.log("Dispatching FETCH_FRUITS");
    dispatch({ type: "FETCH_FRUITS" });
  }, [dispatch]);

  console.log("Fruits in MarketPlace:", fruits);
  console.log("Inventory in Market:", inventory);
  console.log("Error in MarketPlace:", error);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fruits || Object.keys(fruits).length === 0) {
    return <div>Loading fruits...</div>;
  }

  const hasFruits =
    fruits && typeof fruits === "object" && Object.keys(fruits).length > 0;

    const fruitQuantities = Array.isArray(inventory) ? getFruitQuantities(inventory) : {};

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <PriceUpdater onPricesUpdate={handlePricesUpdate} /> */}
      {/* <Wallet /> */}
      <h3>Fruit Market</h3>
      {/* <FruitsList />  */}
      {error ? (
        <p>Error: {error}</p>
      ) : hasFruits ? (
        <ul>
          {Object.entries(fruits).map(
            ([key, fruit]) =>
              key !== "error" && (
                <li key={key}>
                  <p>
                    {capitalizeFirstLetter(
                      replaceUnderscoreWithSpace(fruit.name|| "")
                    )}
                    : ${parseFloat(fruit.current_price)?.toFixed(2)}
                    (Quantity: {fruitQuantities[fruit.id] || 0})
                    <BuyButton fruit={fruit} />
                  </p>
                </li>
              )
          )}
        </ul>
      ) : (
        <p>No fruits available</p>
      )}
      <Inventory inventory={inventory} />
      <AverageTotal /> 
      <LogOutButton className="btn" />
    </div>
  );
};

export default Market;
