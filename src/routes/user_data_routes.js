const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({extended:false})
const userDataController = require("./../controllers/user_data_controller")

router.get("/top_artists", userDataController.getTopArtists)

module.exports = router;