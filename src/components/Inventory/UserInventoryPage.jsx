import React from "react";
import { useSelector } from "react-redux";
import useUserInventory from "../hooks/useUserInventory";
import Inventory from "../Inventory/Inventory";

const UserInventory = () => {
  const inventory = useUserInventory();
  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`/api/inventory/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API response data:', data);

        // Extract inventory for the current user
        const userInventory = data[userId] || [];
        setInventory(Array.isArray(userInventory) ? userInventory : []);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError(err.message);
      }
    };

    fetchInventory();
  }, [userId]);

  return { inventory, error };
};

export default UserInventory;
