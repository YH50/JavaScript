const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Express Router    -USERS- '/'</h1> ");
});

router.get("/search", (req, res) => {
  res.send("<h1>Express Router    -USERS- '/search'</h1> ");
});

module.exports = router;
