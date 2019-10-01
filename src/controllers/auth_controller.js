const spotifyService = require("./../services/SpotifyService");
//Packages / Imports
const axios = require("axios");
const queryString = require("query-string");

//User DB and methods
const User = require("./../database/models/user_model")
const usersController = require("./../controllers/users_controller")
// let userInfo = {};


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

async function register(req, res) {
  //
}

async function spotifyCallback(req,res) {
  var stateKey = 'spotify_auth_state';
  //Received the one time code from authorzation, and state information
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;
  const tokens = await spotifyService.getTokens(code);
  const userData = await spotifyService.getUserData(tokens.access_token);

  let userProfileInfo = {
    spotify_uid: userData.id,
    email: userData.email,
    name: userData.display_name,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token
  }

  const user = await User.findOne({spotify_uid: userProfileInfo.spotify_uid});
  if (!user) {
    //Create new user
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    //Create user in DB
    const body = queryString.stringify(userProfileInfo);

    const response = await axios
      .post(`${process.env.BACKEND_URI}/users`, body, config)
      .then(function(response) {
        console.log(`Sucessfully created user ${userProfileInfo.name}!`);
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    // Run update tokens function

    const newValues = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      created_at: Date.now(),
      updated_at: Date.now()
    };

    console.log(
      `Updating the user's access token to ${
        newValues.access_token
      } and refresh token to ${newValues.refresh_token}`
    );

    usersController.updateTokens(userData.id, newValues);

  }

  res.cookie("tokens", {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token
  });

  res.cookie("userID", userProfileInfo.spotify_uid)


  res.clearCookie(stateKey);
  res.redirect(`${process.env.BACKEND_URI}/dashboard`);

}

module.exports = {
  spotifyRedirection,
  spotifyCallback,
};