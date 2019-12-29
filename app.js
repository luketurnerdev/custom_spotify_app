/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const express = require('express'); // Express web server framework
const app = express();
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const path = require('path');
const exphbs = require("express-handlebars");
const passport = require('passport');
const User = require("./src/database/models/user_model.js");
const SpotifyStrategy = require('passport-spotify').Strategy;
const usersController = require("./src/controllers/users_controller");

app.use(cors());

require("./src/database/connect");
require("dotenv").config();

app.use(cookieParser());

// Use Handlebars as view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, '/src/views'));



// Routes from /routes
app.use(require("./src/routes"));


//Body-parser for converting to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/dist'))
   .use(cors())

   // Custom HTTP errors
global.HTTPError = class HTTPError extends Error {
   constructor(statusCode, message) {
     super(message);
     // Preserve StackTrace
     if (Error.captureStackTrace) {
       Error.captureStackTrace(this, HTTPError);
     }
     this.name = "HTTPError";
     this.statusCode = statusCode;
   }
 };
 

console.log('Listening on 8888, spotify app is a go-go bro');
app.listen(8888);
