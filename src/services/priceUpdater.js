const axios = require('axios');

const updatePricesPeriodically = () => {
  setInterval(() => {
    axios.put('http://localhost:5001/api/fruits/prices')
      .then(response => {
      
      })
      .catch(error => {
        console.error('Error updating fruit prices:', error);
      });
  }, 15000); // Updates every 15 seconds
};

module.exports = updatePricesPeriodically;
