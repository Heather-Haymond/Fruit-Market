import axios from 'axios';

// Function to update all fruit prices
const updateAllPrices = async () => {
  const response = await axios.put('/api/fruits/prices');
  return response.data;
};

// Function to fetch all fruit prices
const fetchPrices = async () => {
  const response = await axios.get('/api/fruits');
  return response.data;
};

export default {
  updateAllPrices,
  fetchPrices
};
