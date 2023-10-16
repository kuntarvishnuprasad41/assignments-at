const userData = require("../db/user-db.json");
const { filterData } = require("../helpers/filterData");
const { writeToFile } = require("../helpers/fileOperations");

/**
 * To update the whole user
 * @param {userId} userId 
 * @param {userBody} userParams 
 * @returns message, status
 */
function updateUser(userId, userParams) {
  let userToUpdate = filterData(userId, 1);
  if (userToUpdate.length == 0) {
    return {
      message: "user not found",
      status: false,
    };
  } else {
    let keys = Object.keys(userParams);
    for (const item in keys) {
      userToUpdate[0][keys[item]] = userParams[keys[item]];
    }
  }
  let usersData = filterData(userId, 2);
  usersData.users.push(userToUpdate[0]);
  return writeToFile(userData, "user");
}

/**
 * To mark the news as read 
 * @param {*} userId 
 * @param {*} newsId 
 * @returns message,status
 */
function readNews(userId, newsId) {
  let userToUpdate = filterData(userId, 1);
  if (userToUpdate.length == 0) {
    return {
      message: "user not found",
      status: false,
    };
  } else if (!userToUpdate[0].read_articles.includes(newsId)) {
    userToUpdate[0].read_articles.push(newsId);
    userData.users = filterData(userId, 2);
    userData.users.push(userToUpdate[0]);
    return writeToFile(userData, "user");
  }
  return {
    message: "News already read by user ",
    status: false,
  };
}

/**
 * To mark the news as Favorite
 * @param {*} userId 
 * @param {*} newsId 
 * @returns message,status
 */
function markNewsFavorite(userId, newsId) {
  let userToUpdate = filterData(userId, 1);
  if (userToUpdate.length == 0) {
    return {
      message: "user not found",
      status: false,
    };
  } else if (!userToUpdate[0].favorite_news.includes(newsId)) {
    userToUpdate[0].favorite_news.push(newsId);
    userData.users = filterData(userId, 2);
    userData.users.push(userToUpdate[0]);
    return writeToFile(userData, "user");
  }
  return {
    message: "Already Added to Favorites",
    status: false,
  };
}

/**
 * To updare newsPreferences
 * @param {*} userId 
 * @param {*} newsPreference 
 * @returns message, status
 */
function updateNewsPreferences(userId, newsPreference) {
  let userToUpdate = filterData(userId, 1);
  if (userToUpdate.length == 0) {
    return {
      message: "user not found",
      status: false,
    };
  } else if (!userToUpdate[0].user_preferences.includes(newsPreference)) {
    userToUpdate[0].user_preferences.push(newsPreference);

    userData.users = filterData(userId, 2);
    userData.users.push(userToUpdate[0]);

    return writeToFile(userData, "user");
  }
  return {
    message: "Preference already exists",
    status: false,
  };
}

module.exports = {
  updateUser,
  readNews,
  updateNewsPreferences,
  markNewsFavorite,
};
