const GenerateReccomendations = () => {
    // console.log('Generate recs executed');
    // //Get the list of URIs that were generated for top tracks
    // //Hit the API with this list (in an array)?
    // //Return a list of reccomended songs
    // //Make them into a id list
    // //Make a playlist for them
    // // https://api.spotify.com/v1/recommendations
    // FetchUserTracks().then ( function (response) {
    //   let seedTracks = [];
    //   //Put the URIs in an array
    //   for (let i=0; i<5; i++) {
    //     seedTracks.push(response.items[i].id);
    //   }
  
    //   //Get the reccomendations
  
    //   $.ajax({
    //     type: 'GET',
    //     url: `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}`,
    //     headers: {
    //       'Authorization': 'Bearer ' + access_token
    //     },
    //     success: function(response) {
    //       //Returns the ID to be used by other functions
          
    //       // userID = response.id;
    //       for (let i=0; i< response.tracks.length; i++) {
    //         //Push into an array of URIs
    //         reccomendations.push(response.tracks[i].uri);
  
  
    //         //Display HTML
    //         let reccomendation = document.createElement('li');
    //         let title = response.tracks[i].name;
    //         let artist = response.tracks[i].artists[0].name;
    //         reccomendation.innerHTML = `Title: ${title}, artist: ${artist}`;
    //         document.getElementById('reccomendations-container').appendChild(reccomendation);
    //       }
    //       // Display playlist creation button
    //       let button = document.createElement('button');
    //       button.id = 'reccomendations-button';
    //       button.textContent = `Create Reccomendations Playlist`;
    //       document.getElementById('reccomendations-container').appendChild(button);
    //       document.getElementById(button.id).addEventListener('click', generateReccomendationsPlaylist);
    //     }
    //   })
  
  
    // });
}
    
export default GenerateReccomendations;
  
  