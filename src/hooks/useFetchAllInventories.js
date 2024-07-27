import { useState, useEffect } from 'react';

const useFetchAllInventories = () => {
  const [inventories, setInventories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await fetch('/api/inventory')

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched all users inventory data:', data);
        setInventories(data);
      } catch (err) {
        console.error('Error fetching all users inventories:', err);
        setError(err.message);
      }
    };

    fetchInventories();
  }, []);

  return { inventories, error };
};

export default useFetchAllInventories;
