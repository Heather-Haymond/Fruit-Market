const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const queryText = "SELECT * FROM fruits";

  pool
    .query(queryText)
    .then((result) => {
      console.log("Fetched fruits:", result.rows);
      res.send(result.rows);
    })

    .catch((error) => {
      console.error("Error fetching fruits", error);
      res.sendStatus(500);
    });
});

module.exports = router;


