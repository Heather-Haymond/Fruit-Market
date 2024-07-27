import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
// import Inventory from "../Inventory/Inventory";
import PriceUpdater from "../PriceUpdater/PriceUpdater";
import BuyButton from "../BuyButton/BuyButton";
import AverageTotal from "../AverageTotal/AverageTotal";
import FruitsList from "../FruitsList/FruitsList";
import AllUsersInventory from "../Inventory/AllUsersInventory";
// import UserInventory from "../Inventory/UserInventory";
import ToggleButton from "../Inventory/ToggleButton";


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

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {/* <PriceUpdater onPricesUpdate={handlePricesUpdate} />  */}
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
                      replaceUnderscoreWithSpace(fruit.name || "")
                    )}
                    : ${parseFloat(fruit.current_price)?.toFixed(2)}
                    <BuyButton fruit={fruit} />
                  </p>
                </li>
              )
          )}
        </ul>
      ) : (
        <p>No fruits available</p>
      )}
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
      <AllUsersInventory />
      <LogOutButton className="btn" />
    </div>
  );
};

export default Market;
