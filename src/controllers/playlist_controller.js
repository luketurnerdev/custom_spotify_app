const axios = require("axios");
const usersController = require("./users_controller")

let accessToken = ""
let userID = ""
export async function viewPlaylists(req, res, next) {
    let playlistsRetrieved = false;
    const userInfo = await axios.get("http://localhost:8888/users/me")
    .then(resp => {
        console.log(resp)
        accessToken = resp.data.access_token;
        userID = resp.data.spotify_uid;
    })
    .catch(err => {
        console.log(err);
    })

    // Playlist API call
     const config = { 
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": `Bearer ${accessToken}`
            }
        };

        const response = await axios.get(
            `https://api.spotify.com/v1/users/${userID}/playlists?limit=50`,
            config
            )
        
        console.log(playlistsRetrieved);

        let playlists = response.data.items;        
        let container = document.getElementById('playlist-container')
        for (let i=0; i<playlists.length; i++) {
        
            //Create playlist link
            let a = document.createElement('a');
            let linkText = document.createTextNode(playlists[i].name)
            a.appendChild(linkText);
            a.href = playlists[i].external_urls.spotify;
            a.target = "_blank";
    
            //Add to list
            let newPlaylist = document.createElement("li");
            newPlaylist.appendChild(a);
            container.appendChild(newPlaylist);
    
            //Add delete button
            let deleteButton = document.createElement('button');
            deleteButton.textContent = `Delete Playlist`;
            deleteButton.id = playlists[i].id;
            newPlaylist.appendChild(deleteButton);
            document.getElementById(deleteButton.id).addEventListener('click', deletePlaylist);

         }       
  
}

async function deletePlaylist() {

    const userInfo = await axios.get("http://localhost:8888/users/me")
    .then(resp => {
        console.log(resp)
        accessToken = resp.data.access_token;
        userID = resp.data.spotify_uid;
    })
    .catch(err => {
        console.log(err);
    })

    if (confirm('Are you sure you want to delete this playlist?')) {
  
    //DELETE request
    const config = { 
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    };

    console.log(`AT is ${accessToken}`)

    const deletion = await axios.delete(
        `https://api.spotify.com/v1/playlists/${this.id}/followers`,
        
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

    )
    .then(resp => {
        console.log(resp)
    })
    .catch(err => {
        console.log(err)
    })



  
    //Remove the HTML
    let deletedPlaylist = document.getElementById(this.id);
    deletedPlaylist.parentNode.removeChild(deletedPlaylist);
  
    // var element = document.getElementById(elementId);
    //   element.parentNode.removeChild(element);
  
    } else {
      console.log('not deleted');
    }
  
  }