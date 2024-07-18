import { useState, useEffect } from 'react';

const useFetchInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        console.log('Fetched inventory:', data);
        setInventory(data);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError(err.message);
      }
    };

    fetchInventory();
  }, []);

  return { inventory, error };
};


export default useFetchInventory;
