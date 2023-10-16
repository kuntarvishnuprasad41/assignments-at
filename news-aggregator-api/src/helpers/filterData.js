const userData = require("../db/user-db.json");
const newsData = require("../db/news-db.json");

/**
 * To filter data as required
 * @param {newsId | userId} id 
 * @param {1,2,3,4} type 
 * @returns arrayOf(data)
 */
function filterData(id, type) {
  switch (type) {
    case 1:
      return userData.users.filter((data) => data.user_id === id);
    case 2:
      return userData.users.filter((data) => data.user_id != id);
    case 3:
      return newsData.news.filter((data) => data.news_id == id);
    case 4:
      return userData.users.filter((data) => data.user_email == id);
    case 5:  
      return newsData.news.filter((data) => data.categories == id);  
    default:
      return null;
  }
}

module.exports = { filterData };
