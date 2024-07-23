import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useFetchInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/inventory`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Fetched inventory data:', data);
          setInventory(data);
        }
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError(err.message);
      }
    };

    fetchInventory();
  }, [userId]);

  return { inventory, error };
};

export default useFetchInventory;
