const spotifyService = require("./../services/SpotifyService");
//Packages / Imports
const axios = require("axios");
const queryString = require("query-string");

let generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

function spotifyRedirection(req, res) {
    //Set scope and cookie information
    const scope = 'playlist-modify-public user-top-read user-read-email user-read-private user-read-birthdate';
    let state = generateRandomString(16);
    let stateKey = 'spotify_auth_state';
    res.cookie(stateKey, state);

    //Redirect to the spotify auth page
      res.redirect(
        `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&scope=${scope}&response_type=code&state=${state}&redirect_uri=${process.env.REDIRECT_URI}`
      )
};

async function spotifyCallback(req,res) {
  var stateKey = 'spotify_auth_state';
  //Received the one time code from authorzation, and state information
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;
  const tokens = await spotifyService.getTokens(code);
  const userData = await spotifyService.getUserData(tokens.access_token);

  //Set cookies for tokens
  res.cookie("tokens", {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token
  });

  res.cookie("userID", userData.data.id)
  
  res.clearCookie(stateKey);

  res.redirect("/");
}

module.exports = {
  spotifyRedirection,
  spotifyCallback
};