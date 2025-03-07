import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const PriceUpdater = () => {
  const dispatch = useDispatch();
  const fruits = useSelector((state) => state.fruits || []);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    const fetchPrices = () => {
      dispatch({ type: 'FETCH_FRUITS' });
    };

    const updatePrices = () => {
      dispatch({
        type: 'UPDATE_PRICES',
        payload: {
          callback: (data, error) => {
            if (error) {
              console.error('Error updating prices:', error);
            } else {
              fetchPrices();
            }
          },
        },
      });
    };
    // Initial fetch
    fetchPrices();
    // Set up interval to update prices every 15 seconds
    const intervalId = setInterval(updatePrices, 15000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

    
  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {fruits.length > 0 ? (
          fruits.map((fruit) => (
            <li key={fruit.id}>
              {fruit.name}: $
              {typeof fruit.current_price === 'number' && !isNaN(fruit.current_price)
                ? fruit.current_price.toFixed(2)
                : 'N/A'}
            </li>
          ))
        ) : (
          <p>Ope!</p>
        )}
      </ul>
    </div>
  );
};

export default PriceUpdater;
