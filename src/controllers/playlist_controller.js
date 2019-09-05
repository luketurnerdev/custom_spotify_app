const axios = require("axios");
let accessToken;
let userID;
export async function viewPlaylists(req, res) {

    const userInfo = await axios.get("http://localhost:8888/users/me")
    .then(resp => {
        console.log("####")
        console.log(resp.data)
        const accessToken = resp.data.access_token;
        const userID = resp.data.spotify_uid;
        console.log(userID);
    })
    .catch(err => {
        console.log(err);
    })
        // const config = { 
        //     headers: {
        //         "Content-Type": 'application/x-www-form-urlencoded',
        //         "Authorization": `Bearer ${accessToken}`
        //     }
        // };

        //     const response = await axios.get
        // (
        //     `https://api.spotify.com/v1/users/${userID}/playlists?limit=50`,
        //     config
        // )
        

        // let playlists = response.data.items;
        // let currentInfo = document.createElement('div');
        // currentInfo.id = "current-info";

        // for (let i=0; i<playlists.length; i++) {
        
        //     //Create playlist link
        //     let a = document.createElement('a');
        //     let linkText = document.createTextNode(playlists[i].name)
        //     a.appendChild(linkText);
        //     a.href = playlists[i].external_urls.spotify;
    
        //     //Add to list
        //     let newPlaylist = document.createElement("li");
        //     newPlaylist.appendChild(a);
        //     document.getElementById('playlist-container').appendChild(newPlaylist);
    
        //     //Add delete button
        //     let deleteButton = document.createElement('button');
        //     deleteButton.textContent = `Delete Playlist`;
        //     deleteButton.id = playlists[i].id;
        //     newPlaylist.appendChild(deleteButton);
        //     // document.getElementById(deleteButton.id).addEventListener('click', deletePlaylist);
        
        //   }
  
}