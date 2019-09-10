const User = require("./../database/models/user_model");
const axios = require("axios");
const findUserByToken = require("./_findUserByToken");

//GET to user_data/top_artists
async function getTopArtists(req, res) {
    //Hit the endpoint https://api.spotify.com/v1/me/top/{artists}
    //Save this information as an array of top artists
    //Test: display the user's #1 artist as HTML
    // Stretch: Get that artists picture , other info from the API
    console.log('working?')
    let accessToken = req.cookies.tokens.access_token;
    
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    console.log(config)
    let topArtists = axios.get(
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term",
      config
      )
      .then (resp  => {
        console.log(resp.data)
        res.json(resp.data);
    })
    .catch(err => {
      console.log(err)
    })


}

async function topArtistsButton() {
  let artistArray = [];
  let response = await axios.get
  ("http://localhost:8888/user_data/top_artists")
  .then(resp => {
    artistArray = resp.data.items;
  })
  .catch(err => {
    console.log(err);
  })

  console.log(artistArray[0].name);


  //Handle response in html

  let artistBox = document.getElementById('top-artists-container');
  for (let i=0; i<artistArray.length; i++) {

          //Create link
          let a = document.createElement('a');
          let linkText = document.createTextNode(artistArray[i].name)
          a.appendChild(linkText);
          a.href = "http://www.google.com";
          a.target = "_blank";

          //Add to list
          let newArtist = document.createElement("li");
          newArtist.appendChild(a);
          artistBox.appendChild(newArtist);

  }
}

// let playlists = response.data.items;        
//         let container = document.getElementById('playlist-container')
//         for (let i=0; i<playlists.length; i++) {
        
//             //Create playlist link
//             let a = document.createElement('a');
//             let linkText = document.createTextNode(playlists[i].name)
//             a.appendChild(linkText);
//             a.href = playlists[i].external_urls.spotify;
//             a.target = "_blank";
    
//             //Add to list
//             let newPlaylist = document.createElement("li");
//             newPlaylist.appendChild(a);
//             container.appendChild(newPlaylist);
    
//             //Add delete button
//             let deleteButton = document.createElement('button');
//             deleteButton.textContent = `Delete Playlist`;
//             deleteButton.id = playlists[i].id;
//             newPlaylist.appendChild(deleteButton);





module.exports = {
  getTopArtists,
  topArtistsButton
}

