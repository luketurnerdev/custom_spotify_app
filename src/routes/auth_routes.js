//Imports and express setup
const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth_controller");
const pagesController = require("./../controllers/pages_controller")
const usersController = require("./../controllers/users_controller")

// GET to /auth/login
// Spotify login redirection
router.get("/login", authController.spotifyRedirection);

// Register page
router.get("/register", pagesController.register);

router.post("/register", usersController.create);

// POST to "/register"
// Create a user
// router.post("/register", usersController.create);

//Update a user's tokens
// router.put("/register", usersController.updateTokens);

// GET to /auth/callback
// The app returns here after redirection from spotify auth
router.get("/callback", authController.spotifyCallback);
router.get("/getuser", authController.getUserTokens)

module.exports = router;

