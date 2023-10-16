# News Aggregator API

This API is used to fetch news, perform CRUD on newsDb and have some authentication with users 
This project also fetches news by category from NewsAPI every 14 mins

Please create the .env file with following keys <br/>
PORT = 8080 <br/>
NEWS_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxx <br/>
API_SECRET = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx" <br/>



The project has 2 DBs 

## User DB 

```                                                 
{
      "user_id": uuid4,
      "user_name": "Vishnu",
      "user_email": "vishasaanqup41@outlook.com",
      "password": jwt,
      "user_type": "normal",
      "user_preferences": [],
      "liked_news": [],
      "created_at": "20231005150431",
      "read_articles": [],
      "favorite_news": []
}
```

## News DB
```
    {
      "news_id": UUID4,
      "author": "Angela Chen",
      "title": "Sam Bankman-Fried Made Reasonable Business Decisions, Lawyers Claim",
      "description": "As the FTX founder’s trial got underway, the prosecution claimed Bankman-Fried deliberately stole customer money and used it for his own trading. The defense countered that he always acted in good faith.",
      "url": "https://www.wired.com/story/ftx-trial-sam-bankman-fried-opening-arguments/",
      "urlToImage": "https://media.wired.com/photos/651ddd4a5e4951a83f5ef0a8/191:100/w_1280,c_limit/SBF-Trial-Opening-Arguments-Business-AP23277574817931.jpg",
      "categories": "business",
      "content": "Sam Bankman-Frieds cryptocurrency exchange FTX may have lost at least $8 billion in customer money, but he didnt intend to defraud anyone, his defense team said Wednesday during the opening arguments… [+2558 chars]"
    }
```

## User APIs

### POST : Register
- To register user
  ENDPOINT : 
  ``` /api/users/register ```
  Request Body : 
  ```
  {
    "user_name":"Vu",
    "user_email":"something@something.tld",
    "password" : "password"
  }
  ```

### POST : login
- To login and get jwt
  ENDPOINT :
   ``` /api/users/login ```

   Request Body : 
  ```
  {
    "user_name":"Vu",
    "user_email":"something@something.tld",
    "password" : "password"
  }
  ```
  

### GET : User News Preferences
- Get all the newspreferences by userId
  ENDPOINT : ``` /api/users/preferences/:id ```

### PUT : User News Preference
- API responsible for Adding the news preferences
  ENDPOINT : ``` /api/users/preferences/:id ```

## News APIs
- All APIs under /api/news are authenticated except for '/'
### GET : All
- Get all news, No need to login 
  Endpoint : 
``` /api/news/ ```

### GET : Preferences
 News by user preferences
  Endpoint : 
``` /api/news?userId ```

### GET : Search
 News by search preferences
  Endpoint : 
``` /api/news/search/keyword to search```

### GET : Category
It fetches the news by category
Categories are 
 - [] business
 - [] entertainment
 - [] general
 - [] health
 - [] science
 - [] sports
 - [] technology
ENDPOINT : ``` /api/news/category/categoryName ```

### GET : List Categories
 lists all news categories
  Endpoint : 
``` /api/news/categories```

### GET : Read
 Get read news by userid
  Endpoint : 
``` /api/news/read/userId```

### GET : Favorites
 Get Favorite news by userid
  Endpoint : 
``` /api/news/favorite/userId```


### POST : Mark Read
  Mark news as read
- Req body : 
```
{"user_id": "a30b778f-6952-4fb2-8747-3ffbc045860a"}
```
  Endpoint : 
``` /api/news/:newsId/read ```


### POST : Mark Favorite
  Mark news as favorite
- Req body : 
```
{"user_id": "a30b778f-6952-4fb2-8747-3ffbc045860a"}
```
  Endpoint : 
``` /api/news/:newsId/favorite ```


# FilterData types

| Key | Operations |
| --- | --- |
| 1 | Get user by id |
| 2 | All users except id |
| 3 | News by id |
| 4 | User by email |
| 5 | News by category |


