const axios = require('axios');

const updatePricesPeriodically = () => {
  setInterval(() => {
    axios.put('http://localhost:5001/api/fruits/prices')
      .then(response => {
      
      })
      .catch(error => {
        console.error('Error updating fruit prices:', error);
      });
  }, 5000); // Updates every 5 seconds
};

module.exports = updatePricesPeriodically;
