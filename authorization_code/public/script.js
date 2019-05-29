      (function() {

        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

        var userProfileSource = document.getElementById('user-profile-template').innerHTML,
            userProfileTemplate = Handlebars.compile(userProfileSource),
            userProfilePlaceholder = document.getElementById('user-profile');

        var oauthSource = document.getElementById('oauth-template').innerHTML,
            oauthTemplate = Handlebars.compile(oauthSource),
            oauthPlaceholder = document.getElementById('oauth');

        var params = getHashParams();

        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;

        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {
            // render oauth info
            oauthPlaceholder.innerHTML = oauthTemplate({
              access_token: access_token,
              refresh_token: refresh_token
            });

            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  userProfilePlaceholder.innerHTML = userProfileTemplate(response);

                  $('#login').hide();
                  $('#loggedin').show();
                }
            });
          } else {
              // render initial screen
              $('#login').show();
              $('#loggedin').hide();
          }
          document.getElementById('fetch-user-tracks-short').addEventListener('click', function() {
        $.ajax({
            //Get the tracks with a specific limit and time range
            url: ('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20') ,
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              let tracks = [];
              for (let i=0; i<response.items.length; i++){

                let newTrack = document.createElement("li");
                document.getElementById("tracks-container").appendChild(newTrack);
                newTrack.innerHTML = "Track: " + response.items[i].name + " , Artist: " + response.items[i].artists[0].name;
              }
            }
        });
});

document.getElementById('fetch-user-tracks-medium').addEventListener('click', function() {
        $.ajax({
            //Get the tracks with a specific limit and time range
            url: ('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20') ,
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              let tracks = [];
              for (let i=0; i<response.items.length; i++){

                let newTrack = document.createElement("li");
                document.getElementById("tracks-container").appendChild(newTrack);
                newTrack.innerHTML = "Track: " + response.items[i].name + " , Artist: " + response.items[i].artists[0].name;
              }
            }
        });
});

document.getElementById('fetch-user-tracks-long').addEventListener('click', function() {
        $.ajax({
            //Get the tracks with a specific limit and time range
            url: ('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20') ,
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              console.log(response);

              for (let i=0; i<response.items.length; i++){

                let newTrack = document.createElement("li");
                document.getElementById("tracks-container").appendChild(newTrack);
                newTrack.innerHTML = "Track: " + response.items[i].name + " , Artist: " + response.items[i].artists[0].name;
              }
            }
        });
});


document.getElementById("generate-playlist").addEventListener('click', function() {
    var jsonData = "{\"name\":\"Cool ass playlist\", \"public\":true}";
    console.log('post a playlist');
    console.log(`access token: ${access_token}`);
    $.ajax({

    type: 'POST',
    url: "https://api.spotify.com/v1/users/1237320388/playlists",
    data: jsonData,
    dataType: 'json',
    headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': "application/json"
    },
    body: {
        'name': "My sweet playlist"
    },
    success: function(result) {
        console.log('Woo! :)');
        console.log(result);
    },
    error: function(error) {
        console.log('Error! :(');
        console.log(error.responseText);
    }
    
    });
});



document.getElementById('obtain-new-token').addEventListener('click', function() {
    $.ajax({
      url: '/refresh_token',
      data: {
        'refresh_token': refresh_token
      }
    }).done(function(data) {
      access_token = data.access_token;
      oauthPlaceholder.innerHTML = oauthTemplate({
        access_token: access_token,
        refresh_token: refresh_token
      });
    });
  }, false);
}
})();

      