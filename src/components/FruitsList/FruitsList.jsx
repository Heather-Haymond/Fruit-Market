import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFruits from '../../hooks/useFruits';

const FruitsList = () => {
  const dispatch = useDispatch();
  const { fruits = [], error } = useFruits();

  useEffect(() => {
    dispatch({ type: 'FETCH_FRUITS_REQUEST' });
  }, [dispatch]);

  if (error) return <p>Error loading fruits: {error.message}</p>;

  return (
    <ul>
        <h3>fruits FruitsList</h3>
      {fruits.map(fruit => (
        <li key={fruit.id}>
          {fruit.name} - ${fruit.current_price}
        </li>
      ))}
    </ul>
  );
};

export default FruitsList;
