const { filterData } = require("../helpers/filterData");

/**
 * 
 * @param {newsId} id 
 * @returns arrayOf(news)
 */
function getNews(id) {
  return filterData(id, 3);
}

/**
 * Get the read news by the user
 * @param {userId} userId 
 * @returns [news]
 */
function getReadNews(userId) {
  let user = filterData(userId, 1);
  if (user.length == 0) {
    return {
      message: "user not found",
      status: false
    };
  } else {
    let readNews = [];
    user[0].read_articles.forEach((element) => {
      readNews.push(filterData(element, 3)[0]);
    });

    if (!readNews.length == 0) {
      return {
        message: readNews,
        status: true
      };
    } else {
      return {
        message: "No News read",
        status: false
      };
    }
  }
}

/**
 * Get the news by the userPref
 * @param {userId} userId 
 * @returns [news]]
 */
function getUserPrefs(userId) {
  let user = filterData(userId, 1);
  if (user.length == 0) {
    return {
      message: "user not found",
      status: false
    };
  } else {
    let newsByPref = [];
    user[0].user_preferences.forEach((element) => {
      newsByPref.push(filterData(element, 5));
    });

    if (!newsByPref.length == 0) {
      return {
        status: true,
        message: newsByPref
      };
    } else {
      return {
        status: false,
        message: "no news found"
      }

    }
  }
}



/**
 * Get the favorite news by the user
 * @param {userId} userId 
 * @returns [news]
 */
function getFavNews(userId) {
  let user = filterData(userId, 1);
  if (user.length == 0) {
    return {
      message: "user not found",
      status: false
    };
  } else {
    let favNews = [];
    user[0].favorite_news.forEach((element) => {
      favNews.push(filterData(element, 3)[0]);
    });

    if (!favNews.length == 0) {
      return {
        message: favNews,
        status: true
      };
    } else {
      return {
        message: "No fav news",
        status: false
      };
    }
  }
}

module.exports = { getNews, getReadNews, getFavNews, getUserPrefs };
