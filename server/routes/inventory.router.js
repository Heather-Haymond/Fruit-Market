const express = require('express');
const router = express.Router();
const pool = require('../modules/pool'); 

// GET all inventory
router.get('/', (req, res) => {
  const query = 'SELECT * FROM inventory;'; 
  pool.query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching inventory:', error);
      res.sendStatus(500);
    });
});

module.exports = router;