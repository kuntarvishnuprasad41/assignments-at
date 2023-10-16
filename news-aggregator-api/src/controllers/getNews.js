const fetchUrl = require("../helpers/fetchUrl");
const { newsFromJSON,categories } = require("../models/newsModel");
const { writeToFile } = require("../helpers/fileOperations");
const URL = "https://newsapi.org/v2/";


/**
 * To fetch the news globally, here used for cron-job to keep news refreshing every 14 minutes,
 * which is ~(24*60)/100
 * 100 is number of requests available for free by newsapi.org
 *
 * it just writes to file
//  */
let categoriesList = categories()

async function getNews(){
  for await (const category of categoriesList) {
    let payload = {
      page: 1,
      pageSize : 50,
      q: category,
      apiKey: process.env.NEWS_API_KEY,
    };


    let url = new URLSearchParams(payload);
    try {
      let news = await fetchUrl(`${URL}everything?${url}`);
      let addNews = newsFromJSON(news.articles,category);
      let allNews = new Object();
      allNews.news = addNews;
      writeToFile(allNews, "news");
      console.log(news)
    } catch {
     console.log("something wrong");
    }
  }
}

module.exports = getNews