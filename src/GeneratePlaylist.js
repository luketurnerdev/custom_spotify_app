const GeneratePlaylist = () => {
    // console.log('generate playlist executed');

    //     //Currently this spits out an empty playlist. I think we should only have this visible if the options have been selected.
    //     //Then, an empty playlist gets made, and the recent tracks get added straight after
      
    //   if (selectedAmount != undefined && selectedTime != undefined) {
      
    //   //Check if this playlist has not already been made
    //     if (!playlistGenerated) {
      
    //       //Get the user id to be used
    //       getUserID().then(function(data) {
    //         var playlistName = `Top ${selectedAmount} tracks of the last ${selectedTime} months`;
    //         console.log(`playlist is called ${playlistName}`);
    //         userID = data.id;
    //         console.log('fetched id of ' +  userID);
      
    //         var jsonData = `{\"name\":\"${playlistName}\", \"public\":true}`;
          
    //         // Create an empty playlist
    //           $.ajax({
    //           type: 'POST',
    //             url: `https://api.spotify.com/v1/users/${userID}/playlists`,
    //             data: jsonData,
    //             dataType: 'json',
    //             headers: {
    //               'Authorization': 'Bearer ' + access_token,
    //               'Content-Type': "application/json"
    //             },
    //             body: {
    //               'name': playlistName,
    //             },
    //             success: function(result) {
    //               playlistGenerated = true;
      
    //               //store the new playlist in a variable
    //               console.log('Woo! :)', playlistGenerated);
    //               playlistId = (result.id);
    //               console.log("id:" + playlistId);
      
    //               //Gather track data
      
    //               FetchUserTracks().then(function(response) {
    //                 let successHeader = document.createElement("h2");
    //                 document.getElementById("tracks-container").appendChild(successHeader);
    //                 successHeader.innerHTML = "Successfully created playlist with the following tracks:"
    //                 //Add the URIs of top tracks to an array
                   
      
    //                 for (let i=0; i<response.items.length; i++){
      
    //                   let newTrack = document.createElement("li");
    //                   document.getElementById("tracks-container").appendChild(newTrack);
    //                   newTrack.innerHTML = "Track: " + response.items[i].name + " , Artist: " + response.items[i].artists[0].name;
    //                   newPlaylistURIs.push (response.items[i].uri);
    //                 }
                    
    //                 console.log(`URIS: ${newPlaylistURIs.join()}`);
      
    //                  //Add the tracks to the new playlist
    //                 $.ajax({
      
    //                   type: 'POST',
    //                   url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${newPlaylistURIs.join()}`,
      
    //                   dataType: 'text',
    //                   headers: {
    //                     'Authorization': 'Bearer ' + access_token
    //                   },
                      
    //                   success: function(result) {
                      
    //                     //store the new playlist in a variable
    //                     console.log('successfully posted top tracks to new playlist');
    //                     console.log(result);
                      
                      
    //                   },
    //                   error: function(error) {
    //                     console.log('Error! :(');
    //                     console.log(error.responseText);
    //                   }
                      
    //                 });
    //               })
    //           },
    //         error: function(error) {
    //           console.log('Error! :(');
    //           console.log(error.responseText);
    //         }
      
    //           });
    //     });
      
    //     } else {
    //       console.log ('Playlist has already been made');
    //       //HTML rendering
    //       error = document.createElement('h1');
    //       error.textContent = "Looks like this playlist has already been generated.";
    //       document.getElementById("tracks-container").appendChild(error);
    //     }
          
    //     } else {
    //       console.log("Params not selected");
    //       //HTML rendering
    //       error = document.createElement('h1');
    //       error.textContent = "Please select a time period and track amount first.";
    //       document.getElementById("tracks-container").appendChild(error);
    //       }
      
};

export default GeneratePlaylist;