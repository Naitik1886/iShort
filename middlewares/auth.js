const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET

function isLoggedIn(req, res, next) {
  // Check if token exists and is not empty
  if (!req.cookies.token || req.cookies.token === "") {
    return res.redirect("/login");
  } else {
    
      const data = jwt.verify(req.cookies.token, secret);
      req.user = data;
      next();
    } 
  }    


module.exports = {
    isLoggedIn, 

}


