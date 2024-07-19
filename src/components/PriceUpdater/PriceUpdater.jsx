import React, { useState, useEffect } from "react";
import axios from "axios";

const PriceUpdater = ({ onPricesUpdate }) => {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get("/api/fruits");
        if (response.data) {
          console.log("Fetched prices:", response.data);
          const updatedPrices = response.data.map((fruit) => ({
            ...fruit,
            current_price: parseFloat(fruit.current_price),
          }));
          setPrices(updatedPrices);
          if (typeof onPricesUpdate === "function") {
            onPricesUpdate(updatedPrices);
          }
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
        setError("Error fetching prices");
      }
    };

    const updatePrices = async () => {
      try {
        await axios.put("/api/fruits/update-all");
        fetchPrices();
      } catch (error) {
        console.error("Error updating prices:", error);
      }
    };

    fetchPrices();
    const intervalId = setInterval(updatePrices, 15000);
    return () => clearInterval(intervalId);
  }, [onPricesUpdate]);

  return (
    <div>
      <h3>Fruit Prices</h3>
      {error && <p>{error}</p>}
      <ul>
        {prices.length > 0 ? (
          prices.map((price) => (
            <li key={price.id}>
              {price.name}: $
              {typeof price.current_price === "number" &&
              !isNaN(price.current_price)
                ? price.current_price.toFixed(2)
                : "N/A"}
            </li>
          ))
        ) : (
          <li>No prices available</li>
        )}
      </ul>
    </div>
  );
};

export default PriceUpdater;
