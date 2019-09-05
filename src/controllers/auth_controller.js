const spotifyService = require("./../services/SpotifyService");
//Packages / Imports
const axios = require("axios");
const queryString = require("query-string");

//User DB and methods
const User = require("./../database/models/user_model")
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
  // const userID = userData.data.id

 
  //Save userData into the DB

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

    //Put the body data in the correct format
    const body = queryString.stringify(userProfileInfo);

    const response = await axios
      .post(`${process.env.BACKEND_URI}/users`, body, config)
      .then(function(response) {
        console.log(`Sucessfully created user ${userData.name}!`);
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  res.clearCookie(stateKey);
  //Return user info as json object
  // res.redirect("/");

}
function getUserTokens(req,res) {
  // if (userInfo) {
  //   console.log(userInfo)
  //   res.json(userInfo)
  // } else {
    
  // }
}

module.exports = {
  spotifyRedirection,
  spotifyCallback,
  getUserTokens
};