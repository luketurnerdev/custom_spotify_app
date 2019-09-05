const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users_controller")
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({extended:false})

// Get current user route
router.get("/me", usersController.getUser);

router.get("/", usersController.getAllUsers);

router.post("/", urlEncodedParser, usersController.create)

module.exports = router;
