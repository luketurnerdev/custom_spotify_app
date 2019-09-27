//Imports and express setup
const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth_controller");
const pagesController = require("./../controllers/pages_controller")
const usersController = require("./../controllers/users_controller")
const passport = require('passport');


// GET to /auth/login
// Spotify login redirection
router.get("/login", passport.authenticate('spotify', {
  scope: ['playlist-modify-public', 'user-top-read', 'user-read-email', 'user-read-private', 'user-read-birthdate']
}),
function(req, res) {
  //redirect occurs, so this function will not be called
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/auth/loggedout");
});

router.get("/loggedout", pagesController.loggedOut);

// Register page
router.get("/register", pagesController.register);

//Update a user's tokens
// router.put("/register", usersController.updateTokens);

router.get(
  "/callback", passport.authenticate('spotify', {failureRedirect: "/auth/register"}),
  function(req, res) {
    res.redirect("/dashboard");
  }
);
  //  authController.spotifyCallback);

module.exports = router;

