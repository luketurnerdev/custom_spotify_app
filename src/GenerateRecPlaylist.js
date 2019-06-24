const GenerateRecPlaylist = () => {

    // console.log('Generate Rec playlist executed');
    // getUserID().then(function (data) {
    //     //Time of playlist generation
    //     let date = new Date();
    //     const day = date.getDate();
    //     const month = date.toLocaleString('en-us', { month: 'long' });
    //     let jsonData = `{\"name\":\"My Reccomended Tracks on ${day} ${month}\", \"public\":true}`;
    //     let userID = data.id;
    //     $.ajax({
    //       type: 'POST',
    //         url: `https://api.spotify.com/v1/users/${userID}/playlists`,
    //         dataType: 'json',
    //         headers: {
    //           'Authorization': 'Bearer ' + access_token,
    //           'Content-Type': "application/json"
    //         },
    //         data: jsonData,
    //         dataType: 'json',
    //         body: {
    //           'name': "My Reccomended Tracks",
    //         },
    //         success: function(result) {
    //           console.log(result);
    //           let playlistID = result.id;
    
    //           $.ajax({
    
    //             type: 'POST',
    //             url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${reccomendations.join()}`,
    //             dataType: 'text',
    //             headers: {
    //               'Authorization': 'Bearer ' + access_token
    //             },
                
    //             success: function(result) {
                
    //               //store the new playlist in a variable
    //               console.log('successfully posted reccomended tracks to new playlist');
    //               console.log(result);
    
    //               //Render success html
    
    //               let successMessage = document.createElement('h1');
    //               successMessage.textContent = "Successfully created reccomendations playlist!";
    //               document.getElementById("reccomendations-container").appendChild(successMessage);
                
                
    //             },
    //             error: function(error) {
    //               console.log('Error! :(');
    //               console.log(error.responseText);
    //             }
                
    //           });
    //         }
    //       });
    //   })
};

export default GenerateRecPlaylist;