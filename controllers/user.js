const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET


async function handleUserSignUp(req, res) {
  const { firstName, lastName , email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.redirect("/")
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
     const createdUser =  await User.create({
        firstName,
        lastName, 
        email,
        password: hash,
      });
      const token = jwt.sign({ email: email, userId: createdUser._id }, secret);
     
      res.cookie("token", token);

      return res.redirect("/");
    });
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login", { error: "invalid email or password" });
  }
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) return console.log(err);
    if (!result)
      return res.render("login", { error: "invalid email or password" });
    else {
      const token = jwt.sign({ email: email, userId: user._id }, secret);
      
      res.cookie("token", token);

      return res.redirect("/");
    }
  });
}






module.exports = {
  handleUserSignUp,
  handleUserLogin,
  // isLoggedIn,
};
