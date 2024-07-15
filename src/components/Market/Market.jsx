import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

const Market = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fruits = useSelector((state) => state.fruits);
  const error = useSelector((state) => state.fruits?.error);

  useEffect(() => {
    console.log("Dispatching FETCH_FRUITS");
    dispatch({ type: "FETCH_FRUITS" });
  }, [dispatch]);

  console.log("Fruits in MarketPlace:", fruits);
  console.log("Error in MarketPlace:", error);

  if (!fruits) {
    return <div>Loading fruits...</div>;
  }

  const hasFruits =
    fruits && typeof fruits === "object" && Object.keys(fruits).length > 0;

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Fruit:</p>
      {fruits.error ? (
        <p>Error: {fruits.error}</p>
      ) : Object.keys(fruits).length > 0 ? (
        <ul>
          {Object.entries(fruits).map(
            ([key, fruit]) =>
              key !== "error" && (
                <li key={key}>
                  <p>
                    {fruit.name}: ${parseFloat(fruit.current_price)?.toFixed(2)}
                  </p>
                </li>
              )
          )}
        </ul>
      ) : (
        <p>{error ? `Error: ${error}` : "No fruits available"}</p>
      )}

      <LogOutButton className="btn" />
    </div>
  );
};

export default Market;