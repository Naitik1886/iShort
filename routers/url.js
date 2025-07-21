const express = require("express");
const { handlePostUrl } = require("../controllers/url");

const router = express.Router();

router.route("/").post(handlePostUrl);

// router.get("/:shortID", handleGetUrl);

module.exports = router;  

 

