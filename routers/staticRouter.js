const express = require("express");
const Url = require("../models/url");
const User = require("../models/user");
const { isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isLoggedIn, async (req, res) => {
     const userData = await User.findById(req.user.userId);
  
  const allUrls = await Url.find({ createdBy: req.user.userId });
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  return res.render("home", { allUrls , baseUrl:process.env.BASE_URL,user : userData});
});

router.get("/signup", (req, res) => {                
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

 router.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await Url.findOne({ shortID: shortID });
  return res.redirect(entry.mainUrl);
})

module.exports = router;
