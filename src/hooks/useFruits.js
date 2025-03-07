import { useSelector } from 'react-redux';

const useFruits = () => {
  const state = useSelector(state => state); 
  console.log('Redux state:', state);

  const fruits = state.fruits.filter(fruit => fruit && Object.keys(fruit).length > 0);
  const error = state.fruits;

  return { fruits, error };
};

export default useFruits;