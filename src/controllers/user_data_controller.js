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
  
  let container = document.getElementById('top-artists-container');
  let artistList = document.createElement("ol");
  for (let i=0; i<artistArray.length; i++) {
    
    //Create link
    let a = document.createElement('a');
    let linkText = document.createTextNode(artistArray[i].name)
    a.appendChild(linkText);
    a.href = artistArray[i].href;
    a.target = "_blank";
    
    //Add to list
    let artist = document.createElement("li");
    artist.appendChild(a);
    artistList.appendChild(artist);
  }

    //Toggle display
    if (!container.innerHTML) {
      // container.innerHTML = ""
      container.appendChild(artistList);
    } else {
      container.innerHTML = ""
    }

  }

  //GET to user_data/top_tracks
  async function getTopTracks(req, res) {
    let accessToken = req.cookies.tokens.access_token;
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
   
    let topTracks = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term",
      config
      )
      .then (resp  => {
        res.json(resp.data.items);
    })
    .catch(err => {
      console.log(err)
    })

  }

  async function setTrackParameters() {
    let topTracks = [];
      await axios.get
      ("http://localhost:8888/user_data/top_tracks")
      .then(resp => {
        topTracks = resp.data;
      })
      .catch(err => {
        console.log(err);
      })
      let tracks = []

      topTracks.forEach((track) => {
          tracks.push({
            "title": track.name,
            "artist": track.artists[0].name,
            "album": track.album.name,
            "link": track.href,
            "popularity": track.popularity
          })
      });

      return tracks;
  }

  async function setTrackHTML() {
    

    await setTrackParameters()
    .then(resp => {
      let tracks = [];
      let tracksHTML = "";

      tracks.push(resp);
      console.log("resp below");
      console.log(resp[0]);
      for (let i=0; i<resp.length; i++) {

        let a = document.createElement('a');
        let linkText = document.createTextNode(resp[i].title)
        a.appendChild(linkText);
        a.href = resp[i].href;
        a.target = "_blank";
        // tracksHTML += a;

      }
      document.getElementById("top-tracks-container").innerHTML = tracksHTML;
    })
    .catch(err => {
      console.log(err)
    })
    
    
  }
    


  module.exports = {
    getTopArtists,
    getTopTracks,
    topArtistsButton,
    setTrackHTML
}
