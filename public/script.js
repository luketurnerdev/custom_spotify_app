//Global vars

var userID = "";
let reccomendations = [];


let selectedAmount;
let selectedTime;


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
  } else 
  {

    if (access_token) {
      // render oauth info
      obtainNewToken();
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

  //Playlist variables

  var playlistId = "";
  let newPlaylistURIs = [];

  //User variables

 

/// Function definitions ///

function fetchUserTracks() {
  return $.ajax({
    //Get the tracks with a specific limit and time range
    url: (`https://api.spotify.com/v1/me/top/tracks?time_range=${selectedTime}&limit=${selectedAmount}`) ,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    success: function(response) {

      console.log('successfully fetched user tracks');
    }
});
}

function getUserID() {

  return $.ajax({
    type: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    success: function(response) {
      //Returns the ID to be used by other functions
      
      userID = response.id;
      console.log('Lukes user id:' + response.id);
    }
  });
}

  //Check if this playlist has already been generated
  var playlistGenerated = false;

function generatePlaylist() {
  
  //Currently this spits out an empty playlist. I think we should only have this visible if the options have been selected.
  //Then, an empty playlist gets made, and the recent tracks get added straight after

if (selectedAmount != undefined && selectedTime != undefined) {

//Check if this playlist has not already been made
  if (!playlistGenerated) {

    //Get the user id to be used
    getUserID().then(function(data) {
      var playlistName = `Top ${selectedAmount} tracks of the last ${selectedTime} months`;
      console.log(`playlist is called ${playlistName}`);
      userID = data.id;
      console.log('fetched id of ' +  userID);

      var jsonData = `{\"name\":\"${playlistName}\", \"public\":true}`;
    
      // Create an empty playlist
        $.ajax({
        type: 'POST',
          url: `https://api.spotify.com/v1/users/${userID}/playlists`,
          data: jsonData,
          dataType: 'json',
          headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': "application/json"
          },
          body: {
            'name': playlistName,
          },
          success: function(result) {
            playlistGenerated = true;

            //store the new playlist in a variable
            console.log('Woo! :)', playlistGenerated);
            playlistId = (result.id);
            console.log("id:" + playlistId);

            //Gather track data

            fetchUserTracks().then(function(response) {
              let successHeader = document.createElement("h2");
              document.getElementById("tracks-container").appendChild(successHeader);
              successHeader.innerHTML = "Successfully created playlist with the following tracks:"
              //Add the URIs of top tracks to an array
              for (let i=0; i<response.items.length; i++){

                let newTrack = document.createElement("li");
                document.getElementById("tracks-container").appendChild(newTrack);
                newTrack.innerHTML = "Track: " + response.items[i].name + " , Artist: " + response.items[i].artists[0].name;
                newPlaylistURIs.push (response.items[i].uri);
              }
              console.log(`URIS: ${newPlaylistURIs.join()}`);

               //Add the tracks to the new playlist
              $.ajax({

                type: 'POST',
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${newPlaylistURIs.join()}`,
                // url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh`,

                dataType: 'text',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                
                success: function(result) {
                
                  //store the new playlist in a variable
                  console.log('successfully posted top tracks to new playlist');
                  console.log(result);
                
                
                },
                error: function(error) {
                  console.log('Error! :(');
                  console.log(error.responseText);
                }
                
              });
            })
        },
      error: function(error) {
        console.log('Error! :(');
        console.log(error.responseText);
      }

        });
  });

  } else {
    console.log ('Playlist has already been made');
  }
    
  } else {
    console.log("Params not selected");
    //HTML rendering
    error = document.createElement('h1');
    error.textContent = "Please select a time period and track amount first.";
    document.getElementById("tracks-container").appendChild(error);
    }
  }

function viewTopTracks() {

  if (selectedAmount != undefined && selectedTime != undefined) {

      //Gather track data
    fetchUserTracks().then(function(response) {
      let successHeader = document.createElement("h2");
      document.getElementById("tracks-container").appendChild(successHeader);
      successHeader.innerHTML = "Here are your top tracks:"
      //Add the URIs of top tracks to an array
      for (let i=0; i<response.items.length; i++){
  
        let newTrack = document.createElement("li");
        document.getElementById("tracks-container").appendChild(newTrack);
        newTrack.innerHTML = "Track: " + response.items[i].name + " , Artist: " + response.items[i].artists[0].name;
        // newPlaylistURIs.push (response.items[i].id);
      }
      // console.log(newPlaylistURIs.join());
    });
  } else {
    console.log("Params not selected");
    //HTML rendering
    error = document.createElement('h1');
    error.textContent = "Please select a time period and track amount first.";
    document.getElementById("tracks-container").appendChild(error);
  }
}


function obtainNewToken() {
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
}

window.onload = obtainNewToken;

function viewPlaylists() {
  obtainNewToken();
  //Get the playlists from the API
  $.ajax({
    url: 'https://api.spotify.com/v1/users/1237320388/playlists?limit=50',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },

    success: function(response) {
      var playlists = response.items;
      for (let i=0; i<playlists.length; i++) {

        //Create playlist link
        let a = document.createElement('a');
        let linkText = document.createTextNode(playlists[i].name)
        a.appendChild(linkText);
        a.href = playlists[i].external_urls.spotify;

        //Add to list
        let newPlaylist = document.createElement("li");
        document.getElementById("tracks-container").appendChild(newPlaylist);
        newPlaylist.appendChild(a);

        //Add delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = `Delete Playlist`;
        deleteButton.id = playlists[i].id;
        newPlaylist.appendChild(deleteButton);
        document.getElementById(deleteButton.id).addEventListener('click', deletePlaylist);
    
      }

      //Create recommendation button

      let reccomendationButton = document.createElement('button');
      reccomendationButton.textContent = "Get reccomendations";
      reccomendationButton.id = 'reccomendation-button';
      document.getElementById("playlist-container").appendChild(reccomendationButton);
      document.getElementById("reccomendation-button").addEventListener('click', generateReccomendations);

    }
});
}

function deletePlaylist() {

  if (confirm('Are you sure you want to delete this playlist?')) {

    //DELETE request
    $.ajax({
      type: 'DELETE',
      url: `https://api.spotify.com/v1/playlists/${this.id}/followers`,
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function(response) {
        //Returns the ID to be used by other functions
        
        // userID = response.id;
        console.log('Playlist successfully deleted');
      }
  });

  //Remove the HTML
  let deletedPlaylist = document.getElementById(this.id);
  deletedPlaylist.parentNode.removeChild(deletedPlaylist);

  // var element = document.getElementById(elementId);
  //   element.parentNode.removeChild(element);

  } else {
    console.log('not deleted');
  }

}

function generateReccomendations() {
  //Get the list of URIs that were generated for top tracks
  //Hit the API with this list (in an array)?
  //Return a list of reccomended songs
  //Make them into a id list
  //Make a playlist for them
  // https://api.spotify.com/v1/recommendations
  fetchUserTracks().then ( function (response) {
    let seedTracks = [];
    //Put the URIs in an array
    for (let i=0; i<5; i++) {
      seedTracks.push(response.items[i].id);
    }

    //Get the reccomendations

    $.ajax({
      type: 'GET',
      url: `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}`,
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function(response) {
        //Returns the ID to be used by other functions
        
        // userID = response.id;
        for (let i=0; i< response.tracks.length; i++) {
          //Push into an array of URIs
          reccomendations.push(response.tracks[i].uri);


          //Display HTML
          let reccomendation = document.createElement('li');
          let title = response.tracks[i].name;
          let artist = response.tracks[i].artists[0].name;
          reccomendation.innerHTML = `Title: ${title}, artist: ${artist}`;
          document.getElementById('reccomendations-container').appendChild(reccomendation);
        }
        // Display playlist creation button
        let button = document.createElement('button');
        button.id = 'reccomendations-button';
        button.textContent = `Create Reccomendations Playlist`;
        document.getElementById('reccomendations-container').appendChild(button);
        document.getElementById(button.id).addEventListener('click', generateReccomendationsPlaylist);
      }
    })


  });

}

function generateReccomendationsPlaylist() {

  getUserID().then(function (data) {
    let jsonData = `{\"name\":\"My Reccomended Tracks\", \"public\":true}`;
    let userID = data.id;
    $.ajax({
      type: 'POST',
        url: `https://api.spotify.com/v1/users/${userID}/playlists`,
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + access_token,
          'Content-Type': "application/json"
        },
        data: jsonData,
        dataType: 'json',
        body: {
          'name': "My Reccomended Tracks",
        },
        success: function(result) {
          console.log(result);
          let playlistID = result.id;

          $.ajax({

            type: 'POST',
            url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${reccomendations.join()}`,
            dataType: 'text',
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            
            success: function(result) {
            
              //store the new playlist in a variable
              console.log('successfully posted reccomended tracks to new playlist');
              console.log(result);
            
            
            },
            error: function(error) {
              console.log('Error! :(');
              console.log(error.responseText);
            }
            
          });
        }
      });
  })
  
}






/// Button Calls ///

document.getElementById('obtain-new-token').addEventListener('click', obtainNewToken, false);
document.getElementById("view-top-tracks").addEventListener('click', viewTopTracks);

document.getElementById("generate-playlist").addEventListener('click', generatePlaylist);
document.getElementById("view-user-playlists").addEventListener('click', viewPlaylists);

//Saving the users selections for playlist options
document.getElementById("time-selector").addEventListener('click', saveTimeData);
document.getElementById("amount-of-tracks").addEventListener('click', saveTrackAmount);




function saveTimeData() {

  let timeArr = document.getElementsByName("time-period");
  timeArr.forEach((element) =>{
    if (element.checked === true) {
      selectedTime = element.value;
    };

    switch (selectedTime) {
      case ("1-month"):
        selectedTime = "short_term";
        break;

      case ("6-months"):
      selectedTime = "medium_term";
      break;

      case ("all-time"):
      selectedTime = "long_term";
        break;

      default:
        // console.log('no time defined');
    }

    console.log(selectedTime);
    


  });

  
  
}
function saveTrackAmount() {

  let trackArr = document.getElementsByName("track-amount");
  trackArr.forEach((element) =>{
    if (element.checked === true) {
      selectedAmount = element.value;

      //HTML change
      document.getElementById("generate-playlist").innerHTML = `Generate playlist of ${selectedAmount} tracks `;
    };
    
  });

  
}


// module.exports = {
//   selectedAmount,
//   selectedTime,
// }

}
})();
