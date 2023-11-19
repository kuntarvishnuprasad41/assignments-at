const jwt = require("jsonwebtoken");

/**
 * To verify the header
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.API_SECRET,
      function (err, decode) {
        if (err) {
          req.user = undefined;
          req.message = "Header verification failed";
          next();
        } else {
            req.message = "Found Successfully";
            next();
          } 
      }
    );
  } else if ( req.path == '/') return next(); else{
    res.status(500).send({message:"Auth header not passed"})
  }
};

module.exports = verifyToken;
