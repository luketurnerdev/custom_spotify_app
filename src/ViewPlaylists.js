//Main function imports
import GetUserID from "./auth/GetUserID";
import SpotifyInit from "./SpotifyInit";
import DeletePlaylist from "./playlists/DeletePlaylist";

//Auth info imports

import {AccessToken} from "./SpotifyInit";

const ViewPlaylists = () => {
    let access_token = AccessToken();
    GetUserID().then (function(data) {
        let id = data.id;
        // console.log("user id: " + id);

  //Get the playlists from the API
        $.ajax({
          url: `https://api.spotify.com/v1/users/${id}/playlists?limit=50`,
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
      
          //Do something with the resulting playlists
          success: function(response) {

            var playlists = response.items;
            //Make the div for current info to display
            let currentInfo = document.createElement('div');
            currentInfo.id = "current-info";

            //Loop through playlists and add to the div
            for (let i=0; i<playlists.length; i++) {
      
                //Create playlist link for each element
                let a = document.createElement('a');
                let linkText = document.createTextNode(playlists[i].name)
                a.appendChild(linkText);
                a.href = playlists[i].external_urls.spotify;
        
                //Add to list
                let newPlaylist = document.createElement("li");
                newPlaylist.appendChild(a);
                // document.getElementById('playlist-container').appendChild(newPlaylist);
        
                //Add delete button
                let deleteButton = document.createElement('button');
                deleteButton.textContent = `Delete Playlist`;
                deleteButton.id = playlists[i].id;
                newPlaylist.appendChild(deleteButton);
                document.getElementById(deleteButton.id).addEventListener('click', DeletePlaylist);
            
              }

              //Render the final info as HTML

              document.getElementById('tracks-container').innerHTML = currentInfo;

    
          }

        }

        )}
    )};

export default ViewPlaylists;




              
      
    //       }
    //   });
    //   });
// };



