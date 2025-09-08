
import path from "path"; // import the path module
import express from "express"; // import the express module
import defaultRoutes from "./routes/default.js"; // import default routes
import restaurantRoutes from "./routes/restaurants.js"; // import restaurant routes
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // create an Express application

app.set("views", path.join(__dirname, "views")); // set the views directory
app.set("view engine", "ejs"); // set EJS as the templating engine

app.use(express.static("public")); // to serve static files
app.use(express.urlencoded({ extended: false })); // to parse form data

app.use("/", defaultRoutes); // use default routes
app.use("/", restaurantRoutes); // use restaurant routes

app.use(function (req, res) {
  res.status(400).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
