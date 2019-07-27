const spotifyService = require("./../services/SpotifyService");
//Packages / Imports
const axios = require("axios");
const queryString = require("query-string");

function spotifyRedirection(req, res) {
    //Gather the one time code from the request
    //Use the code to send the user to spotify auth
    
    res.redirect(
        "https://accounts.spotify.com/authorize"
      );


      app.get('/login', function(req, res) {
        var scopes = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' + my_client_id +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' + encodeURIComponent(redirect_uri));
        });
};



module.exports = spotifyRedirection;

