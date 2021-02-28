const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

app.use(cors());

const suburl = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}`;

app.get("/weather", (req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;
  let tempType = req.query.tempType;
  var userGeoLocation = lat + "," + long;
  var url = "";
  if (tempType == "si") {
    url = suburl + "/" + userGeoLocation + "?units=" + tempType;
  } else {
    url = suburl + "/" + userGeoLocation;
  }

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      res.json(json);
    });
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found");
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
