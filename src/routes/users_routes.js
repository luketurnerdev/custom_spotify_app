const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users_controller")
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({extended:false})
const passport = require('passport');
const cors = require ('cors');

// Get current user route
// router.get("/me", 
//   passport.authenticate('spotify', {failureRedirect: "/auth/register"}),
//   usersController.getUser
//   );

router.use(cors());
router.get("/me", 
  usersController.getUser
  );

router.get("/",
// passport.authenticate('spotify', {failureRedirect: "/auth/register"}),
usersController.getAllUsers);

router.post("/", urlEncodedParser, usersController.create)

module.exports = router;
