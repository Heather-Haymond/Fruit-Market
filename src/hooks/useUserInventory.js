import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useUserInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.id);
  console.log("User ID:", userId);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`/api/inventory/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API response data:", data);

        // Check if data is an object or array and handle accordingly
        if (Array.isArray(data)) {
          setInventory(data);
        } else if (typeof data === "object" && data !== null) {
          const userInventory = data[userId] || [];
          setInventory(Array.isArray(userInventory) ? userInventory : []);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError(err.message);
      }
    };

    if (userId) {
      fetchInventory();
    } else {
      console.log("User ID is not available");
    }
 
  }, [userId]);

  return { inventory, error };
};

export default useUserInventory;
