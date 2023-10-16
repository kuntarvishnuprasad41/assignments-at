const express = require("express");
const newsRoutes = require("express").Router();
const fetchUrl = require("../helpers/fetchUrl");
const { newsFromJSON, categories } = require("../models/newsModel");
const { readNews, markNewsFavorite } = require("../helpers/updateUser");
const { getReadNews, getFavNews , getUserPrefs} = require("../helpers/retrievenewsFromFile");
const newsData = require("../db/news-db.json");

newsRoutes.use(express.json());
newsRoutes.use(express.urlencoded({ extended: true }));
const URL = "https://newsapi.org/v2/";


/**
 * Get all news, No need to login 
 * Method : Get
 * Endpoint : /api/news/
 */
newsRoutes.get("/", (req,res)=>{
  if(!newsData.news.length == 0){
    res.status(200).send(newsData)
  }  else{
    res.status(404).send({message: "No news found"})
  }
});


/**
 * News by preferences
 */

newsRoutes.get('/',(req,res)=>{
  let userpref = getUserPrefs(req.query.userId)
  if(userpref.status){
    res.status(200).send(userpref.message);
  }else{
    res.status(404).send({message:userpref.message})
  }

})

/**
 * Search a news
 * method: GET
 * Endpoint :/api/news/search/keyword to search
 */
newsRoutes.get("/search/:keyword", async (req, res) => {
    let payload = {
      page: 1,
      q: req.params.keyword,
      apiKey: process.env.NEWS_API_KEY,
    };
    let url = new URLSearchParams(payload);
    try {
      let news = await fetchUrl(`${URL}everything?${url}`);
      res.status(200).send(newsFromJSON(news.articles));
    } catch {
      res.status(500).send("Something went wrong");
    }
});

/**
 * list all news by category
 * method: GET
 * Endpoint :/api/news/category/categoryName
 */
newsRoutes.get("/category/:category", async (req, res) => {
  let payload = {
    page: 1,
    category: req.params.category,
    apiKey: process.env.NEWS_API_KEY,
  };
  let url = new URLSearchParams(payload);
  try {
    res.status(200).send(await fetchUrl(`${URL}top-headlines?${url}`));
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

/**
 * List of all categories available
 * method: GET
 * Endpoint :/api/news/categories
 */
newsRoutes.get("/cat", (req, res) => {
  let categoryList = categories();
  if(categoryList.length < 1 ){
    res.status(404).send({message:"Server has no categories"})
  }else{
    res.status(200).send(categoryList);
  }
});


/**
 * Get read news by userid
 * pass query params userID
 */
newsRoutes.get("/read", (req, res) => {
  let readNews = getReadNews(req.query.id);
  if(readNews.status){
    res.status(200).send(readNews.message);
  }else{
    res.status(404).send(readNews.message)
  }
});

/**
 * Get favorite news by userid
 * pass query params userID
 */
newsRoutes.get("/favorite", (req, res) => {
  let favNews = getFavNews(req.query.id);
  if(favNews.status){
    res.status(200).send(favNews.message);
  }else{
    res.status(404).send(favNews.message);
  }
});

/**
 * Mark news as read
 * pass userId in request body
 * pass newsId in request param
 */
newsRoutes.post("/:id/read", (req, res) => {
  let result = readNews(req.body.user_id, req.params.id);
  if (result.status) {
    res.status(200).send({ message: "user updated successfully" });
  } else {
    res.status(400).send({ message: result.message });
  }
});


/**
 * Mark news as favorite
 * pass userId in request body
 * pass newsId in request param
 */
newsRoutes.post("/:id/favorite", (req, res) => {
  let result = markNewsFavorite(req.params.id, req.body.user_id);
  if (result.status) {
    res.status(200).send({ message: "user updated successfully" });
  } else {
    res.status(400).send({ message: result.message });
  }
});



module.exports = newsRoutes;
