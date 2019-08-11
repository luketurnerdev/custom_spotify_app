//Imports and express setup
const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth_controller");

// GET to /auth/login
// Spotify login redirection
router.get("/login", authController.spotifyRedirection);

// GET to /auth/callback
// The app returns here after redirection from spotify auth
router.get("/callback", authController.spotifyCallback);

module.exports = router;
