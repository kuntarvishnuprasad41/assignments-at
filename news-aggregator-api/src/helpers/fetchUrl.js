const axios = require("axios");

/**
 * Global fn to fetch news 
 * @param {url to fetch news from} url 
 * @returns either {resolve or reject}
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

module.exports = fetchUrl;
