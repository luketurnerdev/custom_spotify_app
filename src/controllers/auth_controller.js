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
  console.log(req.query);
  //Received the one time code from authorzation, and state information
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;


  const tokens = await spotifyService.getTokens(code);
  const userData = spotifyService.getUserData(tokens.access_token);

  console.log('standard' + tokens)

  //Set cookies for tokens
  res.cookie("tokens", {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token
  });

  console.log(`Access token: ${tokens.access_token}`)

  //Use access token to get user profile
  // console.log(userData);
  //TODO: Deny access if the state is incorrect

    //1. Clear the current cookie
    res.clearCookie(stateKey);
    //2. Make a request for the token using 'code' variable (handle this in the service)



}



module.exports = {
  spotifyRedirection,
  spotifyCallback
};



//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });

