 function ViewPlaylists() {
    console.log('view playlists ran');
        
 }

 module.exports = ViewPlaylists;
    //   getUserID().then (function(data) {
    //     let id = data.id;
    //     obtainNewToken();
    //     //Get the playlists from the API
    //     $.ajax({
    //       url: `https://api.spotify.com/v1/users/${id}/playlists?limit=50`,
    //       headers: {
    //         'Authorization': 'Bearer ' + access_token
    //       },
      
    //       success: function(response) {
    //         var playlists = response.items;
    //         //Make the div for current info to display
    //         let currentInfo = document.createElement('div');
    //         currentInfo.id = "current-info";
    //         console.log(currentInfo.id);
    
    //           //Loop through playlists and add to the div
    //           for (let i=0; i<playlists.length; i++) {
      
    //           //Create playlist link
    //           let a = document.createElement('a');
    //           let linkText = document.createTextNode(playlists[i].name)
    //           a.appendChild(linkText);
    //           a.href = playlists[i].external_urls.spotify;
      
    //           //Add to list
    //           let newPlaylist = document.createElement("li");
    //           newPlaylist.appendChild(a);
    //           console.log(currentInfo);
    //           document.getElementById('playlist-container').appendChild(newPlaylist);
      
    //           //Add delete button
    //           let deleteButton = document.createElement('button');
    //           deleteButton.textContent = `Delete Playlist`;
    //           deleteButton.id = playlists[i].id;
    //           newPlaylist.appendChild(deleteButton);
    //           document.getElementById(deleteButton.id).addEventListener('click', deletePlaylist);
          
    //         }
      
    //         document.getElementById('tracks-container').innerHTML = currentInfo;
      
    //       }
    //   });
    //   });