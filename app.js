const fs = require("fs"); // import the file system module
const path = require("path"); // import the path module

const express = require("express"); // import the express module
const uuid = require("uuid"); // import the uuid module for generating unique IDs

const app = express(); // create an Express application

app.set("views", path.join(__dirname, "views")); // set the views directory
app.set("view engine", "ejs"); // set EJS as the templating engine

app.use(express.static("public")); // to serve static files
app.use(express.urlencoded({ extended: false })); // to parse form data

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);

  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  res.render("404");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);

  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.use(function (req, res) {
  res.render("404");
});

app.use(function (error, req, res, next) {
  res.render("500");
});

app.listen(3000);
