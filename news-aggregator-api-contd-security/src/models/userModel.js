const { v4: uuidv4 } = require("uuid");
const timestamp = require("time-stamp");
const bcrypt = require("bcrypt");
const { filterData } = require("../helpers/filterData");

/**
 * User Model
 */
class User {
  static type = {
    admin: "admin",
    other: "normal",
  };

  constructor(
    user_id,
    user_name = "Default name",
    user_email = "something@something.com",
    password = " ",
    type = User.type.other,
    user_preferences = [],
    liked_news = [],
    created_at = " "
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.user_email = user_email;
    this.password = password;
    this.user_type = type;
    this.user_preferences = user_preferences;
    this.liked_news = liked_news;
    this.created_at = created_at;
    this.read_articles = [];
    this.favorite_news = [];
  }
}

/**
 * Checks the user Request and converts it, with errors wherever needed 
 * @param {user request} obj 
 * @param {*} operation 
 * @returns 
 */
function userFromJSON(obj, operation = "create") {
  if (!obj) return{
    status : false,
    message: "We do not accept empty object",
    user : new User()
  };
  else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.user_email)){
    return{
      status :false,
      message : "Enter valid email"
    };
  }

  else if (operation == "create" && filterData(obj.user_email, 4)[0] == null) {
    let {
      user_name,
      user_email,
      password,
      type,
      user_preferences,
      liked_news,
    } = obj;
    let user_id = uuidv4();
    let created_at = timestamp("YYYYMMDDHHmmss");
    let hashedPassword = bcrypt.hashSync(password, 8);
    return {
      status :true,
      message : "User added successfully",
      user: new User(
        user_id,
        user_name,
        user_email,
        hashedPassword,
        type,
        user_preferences,
        liked_news,
        created_at
      )
  };
  } else if(filterData(obj.user_email,4) != null) {
    return{
      status : false,
      message: "User already exists",
      user : new User()
    };
  }
}


module.exports = { User, userFromJSON };
