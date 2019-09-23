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
            "link": track.external_urls.spotify,
            "popularity": track.popularity
          })
      });
      
      return tracks;
  }

  //GET to /user_data/reccomendations
    function generateReccomendations(req, res) {
    let accessToken = req.cookies.tokens.access_token;
    let topTracks = [];
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
   
    axios.get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term",
      config
    )
    .then (resp  => {
      topTracks = (resp.data.items);
      let seedTracks = [];
      //Put the URIs in an array of seeds
  
      for (let i=0; i<5; i++) {
        seedTracks.push(topTracks[i].id);
      }

      config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      
      axios.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}`,
      config
      )
      .then(resp => {
        // res.json(resp.data.tracks.length);
        let topTracks = resp.data.tracks;
        let reccomendations = [];

        topTracks.forEach((track) => {

          reccomendations.push({
            "title": track.name,
            "artist": track.artists[0].name,
            "album": track.album.name,
            "link": track.external_urls.spotify,
            "popularity": track.popularity,
            "uri": track.uri
          })
      });

      res.json(reccomendations);

      })
      .catch(err => {
        res.json(err);
      })

    })
    .catch(err => {
      console.log(err)
    })

}

//Reccomendations button
async function reccomendationsButton() {
  await axios.get("/user_data/reccomendations")
  .then (resp => {
    let list = HTMLSet(resp);
  })
  .catch(err => {
    console.log(err);
  })

  let container = document.getElementById('reccomendations-container');
  //Toggle display
  if (!container.innerHTML) {
   container.appendChild(trackList);
 } else {
   container.innerHTML = ""
 }
}

function HTMLSet(resp) {
  let trackList = document.createElement("ol");

  for (let i =0; i< resp.length; i++ ) {

    //Title
    let a = document.createElement('a');
    a.href = resp[i].link;
    let itemText = document.createTextNode(resp[i].title);
    a.target = "_blank";
    a.appendChild(itemText);

    let item = document.createElement("li");
    item.appendChild(a);
    item.appendChild(document.createElement("br"));
    
    //Artist
    let artist = document.createTextNode(resp[i].artist);
    item.appendChild(artist);
    item.appendChild(document.createElement("br"));

    //Popularity
    let popularity = document.createTextNode("Popularity: " + resp[i].popularity + " /100");
    item.appendChild(popularity);
    trackList.appendChild(item); 
  }

  return trackList;
}

async function calculateAveragePopularity() {
    let popularityRating = 0;
      await setTrackParameters()
      .then(resp => {
        resp.forEach((track) => {
          popularityRating += track.popularity;
        })

      })
    popularityRating /= tracks.length;
    console.log(popularityRating);
    return popularityRating;
  }

  //Top tracks button
  async function setTrackHTML() {
    
    let trackList = document.createElement("ol");
    await setTrackParameters()
    .then(resp => {
      //Get tracklist info 
      for (let i=0; i<resp.length; i++) {

        //Title
        let a = document.createElement('a');
        a.href = resp[i].link;
        let itemText = document.createTextNode(resp[i].title);
        a.target = "_blank";
        a.appendChild(itemText);

        let item = document.createElement("li");
        item.appendChild(a);
        item.appendChild(document.createElement("br"));
        
        //Artist
        let artist = document.createTextNode(resp[i].artist);
        item.appendChild(artist);
        item.appendChild(document.createElement("br"));


        //Popularity
        let popularity = document.createTextNode("Popularity: " + resp[i].popularity + " /100");
        item.appendChild(popularity);
        trackList.appendChild(item);  
      }
    })
    .catch(err => {
      console.log(err)
    })

    let container = document.getElementById('top-tracks-container');
     //Toggle display
     if (!container.innerHTML) {
      container.appendChild(trackList);
    } else {
      container.innerHTML = ""
    }

    let avgPop = document.createElement("p");
    let popText = document.createTextNode(calculateAveragePopularity());
    avgPop.appendChild(popText);
    document.body.appendChild(avgPop);

    

    
    
  }
    


  module.exports = {
    getTopArtists,
    getTopTracks,
    reccomendationsButton,
    topArtistsButton,
    setTrackHTML,
    generateReccomendations
}
