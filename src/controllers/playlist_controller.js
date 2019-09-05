const axios = require("axios");
const usersController = require("./users_controller")
export async function viewPlaylists(req, res, next) {
    let accessToken = ""
    let userID = ""
    
    const userInfo = await axios.get("http://localhost:8888/users/me")
    .then(resp => {
        console.log(resp)
        accessToken = resp.data.access_token;
        userID = resp.data.spotify_uid;
    })
    .catch(err => {
        console.log(err);
    })

    console.log(accessToken)
    console.log(userID)


    Playlist API call
     const config = { 
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": `Bearer ${accessToken}`
            }
        };

        console.log(userID)

            const response = await axios.get
        (
            `https://api.spotify.com/v1/users/${userID}/playlists?limit=50`,
            config
        )
        

        let playlists = response.data.items;
        console.log(playlists)
        let currentInfo = document.createElement('div');
        currentInfo.id = "current-info";

        for (let i=0; i<playlists.length; i++) {
        
            //Create playlist link
            let a = document.createElement('a');
            let linkText = document.createTextNode(playlists[i].name)
            a.appendChild(linkText);
            a.href = playlists[i].external_urls.spotify;
    
            //Add to list
            let newPlaylist = document.createElement("li");
            newPlaylist.appendChild(a);
            document.getElementById('playlist-container').appendChild(newPlaylist);
    
            //Add delete button
            let deleteButton = document.createElement('button');
            deleteButton.textContent = `Delete Playlist`;
            deleteButton.id = playlists[i].id;
            newPlaylist.appendChild(deleteButton);
            // document.getElementById(deleteButton.id).addEventListener('click', deletePlaylist);
        
          }
  
}