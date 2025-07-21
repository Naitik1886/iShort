const Url = require("../models/url");
const shortid = require("shortid");
const User = require("../models/user");

async function handlePostUrl(req, res) {
       const userData = await User.findById(req.user.userId);

  const shortID = shortid.generate();
  const { url } = req.body;
  if (!url) return res.status(400).json("url is required");

  await Url.create({
    shortID: shortID, 
    mainUrl: url,
    createdBy : req.user.userId,
    
  });

  return res.render("home", { id: shortID,user:userData });
}



module.exports = {
  handlePostUrl,
  // handleGetUrl,
};
