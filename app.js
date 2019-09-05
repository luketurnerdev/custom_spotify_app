/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const cookieParser = require('cookie-parser');
const express = require('express'); // Express web server framework
const app = express();
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const path = require('path');
const exphbs = require("express-handlebars");

// const mongoConnect = require("./src/database/connect");

//Connect to mongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://luke1232:ZXCasdQWE123@cluster0-opxhg.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// Use Handlebars as view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, '/src/views'));

//Enable use of process.env
require("dotenv").config();

// Routes from /routes
app.use(require("./src/routes"));

app.use(cookieParser());


app.use(express.static(__dirname + '/dist'))
   .use(cors())
   // .use(cookieParser());

console.log('Listening on 8888, spotify app is a go-go bro');
app.listen(8888);
