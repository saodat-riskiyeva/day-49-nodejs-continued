const path = require("path"); // import the path module

const express = require("express"); // import the express module

const defaultRoutes = require("./routes/default"); // import default routes
const restaurantRoutes = require("./routes/restaurants"); // import default routes

const app = express(); // create an Express application

app.set("views", path.join(__dirname, "views")); // set the views directory
app.set("view engine", "ejs"); // set EJS as the templating engine

app.use(express.static("public")); // to serve static files
app.use(express.urlencoded({ extended: false })); // to parse form data

app.use("/", defaultRoutes); // use default routes
app.use("/", restaurantRoutes); // use default routes

app.use(function (req, res) {
  res.status(400).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
