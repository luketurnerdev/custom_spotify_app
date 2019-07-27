//Imports and express setup
const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth_controller");

// GET to /auth/login
// Spotify login redirection
router.get("/login", authController.spotifyRedirection);

module.exports = router;

