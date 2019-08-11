/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require('express'); // Express web server framework
const app = express();
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');


const client_id = 'd9cca6b8ff4248c9a2161fd2e94bacc0'; // Your client id
const client_secret = '4b14ba01523c4854ac1508abdc94fb60'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

//Enable use of process.env
require("dotenv").config();

// Routes from /routes
app.use(require("./src/routes"));


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
// var generateRandomString = function(length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };


app.use(express.static(__dirname + '/dist'))
   .use(cors())
   .use(cookieParser());

console.log('Listening on 8888, current code');
app.listen(8888);
