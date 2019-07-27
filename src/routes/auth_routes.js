//Imports and express setup
const express = require("express");
const router = express.Router();

// Spotify login redirection
router.get("/login", authController.);

//Direct the user to authenticate on Meetup.com
//This takes them to a callback route below
router.get('/meetup', authController.meetupRedirect);

//Return from meetup auth page and fetch access and refresh tokens
router.get('/callback', authController.meetupAuth);

//If the user already exists in the db,
// run the below code to update their tokens

module.exports = router;

// app.get('/login', function(req, res) {
        //     var scopes = 'user-read-private user-read-email';
        //     res.redirect('https://accounts.spotify.com/authorize' +
        //       '?response_type=code' +
        //       '&client_id=' + my_client_id +
        //       (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        //       '&redirect_uri=' + encodeURIComponent(redirect_uri));
        //     });