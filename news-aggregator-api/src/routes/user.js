const express = require("express");
const userRoutes = require("express").Router();
const userData = require("../db/user-db.json");
const { filterData } = require("../helpers/filterData");
const { updateNewsPreferences } = require("../helpers/updateUser");
const { register, login } = require("../controllers/authController");

userRoutes.use(express.json());
userRoutes.use(express.urlencoded({ extended: true }));


/**
 * Lists all users
 * For testing purpose
 * Deprected
 */
// userRoutes.get("/", (req, res) => {
//   res.status(200).json(userData);
// });

/**
 * To register user
 * request body : {
    "user_name":"Vu",
    "user_email":"@outlook.com",
    "password" : "password"
}
 */
userRoutes.post("/register", register);

/**
 * To login and get jwt
 * Body : {
    "user_email":"vishnup41@outlook.com",
    "password" : "123@Adm"
}
 */
userRoutes.post("/login", login);


/**
 * Get all the preferences by userId
 * 
 */
userRoutes.get("/preferences/:id", (req, res) => {
  let user = filterData(req.params.id, 1); //1 => user data where userId = passed id 
  res.status(200).send(user[0].user_preferences);
});


/**
 * Add user preference
 * body :  "news_preferences":"news_Preference"
 */
userRoutes.put("/preferences/:id", (req, res) => {
  let result = updateNewsPreferences(req.params.id, req.body.news_preferences);

  if (result.status) {
    res.status(200).send(userData);
  } else {
    res.status(400).send({ message: result.message });
  }
});


module.exports = userRoutes;
