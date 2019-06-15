//Global vars

var userID = "";

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
  var newPlaylistURIs = [];

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
  
if (!playlistGenerated) {

  //Get the user id to be used
  getUserID().then(function(data) {
    var playlistName = `Top ${selectedAmount} tracks of the last ${selectedTime} months`;
    console.log(`playlist is called ${playlistName}`);
    var details = data;
    userID = details.id;
    console.log('fetched id of ' + userID);

    var jsonData = `{\"name\":\"${playlistName}\", \"public\":true}`;
  
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
            console.log(newPlaylistURIs.join());

            //Add the tracks to the new playlist

            $.ajax({

              type: 'POST',
              url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${newPlaylistURIs.join()}`,
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
    url: 'https://api.spotify.com/v1/users/1237320388/playlists',
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






/// Button Calls ///

document.getElementById('obtain-new-token').addEventListener('click', obtainNewToken, false);

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
      document.getElementById("generate-playlist").innerHTML += `${selectedTime}`;
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
