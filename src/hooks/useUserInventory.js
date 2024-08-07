import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useUserInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const currentPrices = useSelector((state) => state.fruit.currentPrices);

  useEffect(() => {
    console.log("User ID:", userId);
    console.log("current_price:", currentPrices);

    const fetchInventory = async () => {
      try {
        const response = await fetch(`/api/inventory/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API response data:", data);

        // Check if data is an object or array and handle accordingly
        let userInventory = [];
        if (Array.isArray(data)) {
          userInventory = data;
        } else if (typeof data === "object" && data !== null) {
          // Assuming data is an object where keys are userIds
          userInventory = data[userId] || [];
          if (!Array.isArray(userInventory)) {
            userInventory = [];
          }
        } else {
          throw new Error("Unexpected data format");
        }
        setInventory(userInventory);
      } catch (err) {
        setError(err.message);
      }
    };
        // console.log("User inventory before combining:", userInventory);

        // Ensure currentPrices is an object with fruit_id as keys
        //const pricesArray = Object.entries(currentPrices).map(([fruit_id, price]) => ({
        //   fruit_id: parseInt(fruit_id, 10), 
        //   price,
        // }));

        // console.log("Prices array:", pricesArray);

        // Combine inventory with current prices
        // const inventoryWithPrices = userInventory.map((item) => {
        //   const priceObj = pricesArray.find((price) => price.fruit_id === item.fruit_id);
        //   console.log("Item:", item);
        //   console.log("Found price:", priceObj);
        //   return {
        //     ...item,
        //     current_price: priceObj ? priceObj.price : null,
        //   };
        // });

    //     console.log("Inventory with current prices:", inventoryWithPrices);
    //     setInventory(inventoryWithPrices);
    //   } catch (err) {
    //     console.error("Error fetching inventory:", err);
    //     setError(err.message);
    //   }
    // };

    if (userId) {
      fetchInventory();
    } else {
      console.log("User ID is not available");
    }
  }, [userId]);

  return { inventory, error };
};

export default useUserInventory;
