const express = require("express");
const routes = require("express").Router();
const dotenv = require("dotenv").config(); 
const app = express();
const userRoutes = require("./routes/user");
const verifytoken = require("./middlewares/authJWS");
const newsRoutes = require("./routes/news");

/**
 * Cronjob to fetch news every 14 mins
 */
const cronjob = require('./cronjobs/fetchNews')


let port = process.env.PORT;

app.use(routes);


//All user APIs
routes.use("/api/users", userRoutes);

//All news APIs
routes.use("/api/news", verifytoken, newsRoutes);


app.get("/", (req, res) => {
  res.status(200).send("Hi");
});


//Err404 for any other URL typed
app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Resource not found</h1>");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Something went wrong");
  } else {
    console.log("Successfully running at : " + port);
  }
});
