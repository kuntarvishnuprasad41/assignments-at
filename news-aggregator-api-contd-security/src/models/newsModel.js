const { v4: uuidv4 } = require("uuid");

/**
 * Data model for news
 */
class News {
  constructor(
    author,
    title,
    description,
    url,
    urlToImage,
    categories,
    content
  ) {
    this.news_id = uuidv4();
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.categories = categories;
    this.content = content;
  }
}

/**
 * to convert newsAPI object to newsDb object
 * @param {from newsAPI} obj 
 * @returns [news]
 */
function newsFromJSON(obj, category = "general") {
  if (!obj) return new News();
  let newsObj = [];
  obj.forEach((element) => {
    let { author, title, description, url, urlToImage, content } =
      element;

    newsObj.push(
      new News(
        author,
        title,
        description,
        url,
        urlToImage,
        category,
        content
      )
    );
  });

  return JSON.parse(JSON.stringify(newsObj));
}

function categories(){
  return [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ]
}

module.exports = { News, newsFromJSON, categories };
