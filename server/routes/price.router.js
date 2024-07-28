const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//update prices

router.put("/update-all", (req, res) => {
  const queryText = ` 

UPDATE fruits 
SET current_price =  
CASE 
WHEN current_price + (random() * 0.50 + 0.01) > 9.99 THEN 9.99 
WHEN current_price + (random() * 0.50 + 0.01) < 0.50 THEN 0.50 
ELSE ROUND(CAST(current_price + (random() * 0.50 + 0.01) AS numeric), 2) 
END 
RETURNING id, name, current_price; 
`;

  pool
    .query(queryText)
    .then(() => {
      console.log(`Updated price for fruits`);
      res.send(result.rows);
    })

    .catch((error) => {
      console.error(`Error updating price for fruits`);
      res.sendStatus(500);
    });
});

// Get all prices

router.get("/", (req, res) => {
  const queryText = "SELECT id, price FROM fruits";

  pool
    .query(queryText)

    .then((result) => {
      res.send(result.rows);
    })

    .catch((error) => {
      console.error("Error fetching prices", error);

      res.sendStatus(500);
    });
});

module.exports = router;
