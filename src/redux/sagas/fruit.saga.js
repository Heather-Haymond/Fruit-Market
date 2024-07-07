const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const queryText = "SELECT * FROM fruits";
  console.log("Fetched fruits:", result.rows);
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error("Error fetching fruits", error);
      res.sendStatus(500);
    });
});

module.exports = router;
