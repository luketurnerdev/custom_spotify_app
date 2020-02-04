//This is the main JS script. Other scripts will be imported here.

import {viewPlaylists} from "./controllers/playlist_controller";
import {logout} from "./controllers/pages_controller";
import axios from 'axios';
import {topArtistsButton, setTrackHTML, reccomendationsButton} from "./controllers/user_data_controller"
const fbDataAnalysis = require("./fb-data/analysis.js");

// document.getElementById("view-user-playlists").addEventListener('click', viewPlaylists);
// j%3A%7B%22access_token%22%3A%22BQBzDRuHDS2MZ0QDu6OLV8n61S8yoL3Ce5GUg5290Vb245m54pSW5-Vm8VTDHyCE3SskUyBQwCEZyBRBlvazskVajKQXBENIM3wHH8cn9nzaVGA7UsqgBkMwZNVR3Ex7mP2TmGc9-q09i7qBIquGhNS2t0qYABZBv5iVESRod3_EEPjHPq6xmeMhik7c0D_vi6gCitw%22%2C%22refresh_token%22%3A%22AQAff4lWkd91AF1pYmfGwwa5RApp1xJZ3pVJLyhwb5KxOTMPWBAmHscmG6mkZmPRfVy2IUt0vt9_HATVFOksCL8B_PdRwBmPxpSrqnG8TKJ8kzHP63v8g4dNCAw9UqFIGBQ%22%7D
async function fbDataButton(req, res) {
  //1. Access the local file and import the 'spotifyTracks' array
  //2. Do API call for playlist generation with this array 
  let tracks = fbDataAnalysis.filterTracks;
  console.log('debuggindddg tracks:');
  console.log('asd6');
  console.log(tracks);

  // let accessToken = "BQCd7CDtH4ECDSGmoxzqz-a9j-yIgvT9bAXertYS2lL4BhzTwFs17kh13XJP1O29lh1ZJWf91NFsIQ6XDh7Y2nb6aP4Gy2D9OWgHDEerHP_A-RtnSBDWVi0cpFxoQrwQh_jNExZtcF9T8NMH54hK1uIYJPWLUivsdQ2CungsfvBMecwsxdS5qoa5QdtHOdgX_mlLt_k";
  // BQCd7CDtH4ECDSGmoxzqz-a9j-yIgvT9bAXertYS2lL4BhzTwFs17kh13XJP1O29lh1ZJWf91NFsIQ6XDh7Y2nb6aP4Gy2D9OWgHDEerHP_A-RtnSBDWVi0cpFxoQrwQh_jNExZtcF9T8NMH54hK1uIYJPWLUivsdQ2CungsfvBMecwsxdS5qoa5QdtHOdgX_mlLt_k
  const config = {
   headers: {
     "Authorization": "Bearer Bearer BQDdRTSkYVaa91N49z8cMxJ29NOAgu6RA4U97pVb7u89dxk8w6L6yV-_iPgyvZBgZHD1x_oj8WNL8nDylHo1UL6Kur0hoaQiLTHS-8q9t4UgbXBQSUnDAfphwxOMwjJuJr1LYtgpHYtEmBmBjGdX4BO7G-eWTvOA-L_QoFmkuiGjLQgrp0CEvUdq5z4j5g9ndX1XW0U",
     "Content-Type": "application/json"
    }
 }
 const data = JSON.stringify({"name": "The Afternoon Cruise"});

 let fbPlaylist = await axios.post(
  "https://api.spotify.com/v1/users/1237320388/playlists",
  config,
  data
  )
  .then(resp => {
    console.log(resp);
  })
  .catch(err => {
    console.log(err)
  })
console.log(fbPlaylist);
}
document.getElementById("view-user-playlists").addEventListener('click', () => {
  alert('asda');
});
document.getElementById("logout-button").addEventListener('click', logout);
document.getElementById("view-top-artists").addEventListener('click', topArtistsButton);
document.getElementById("view-top-tracks").addEventListener('click', setTrackHTML);
document.getElementById("generate-reccomendations").addEventListener('click', reccomendationsButton);
document.getElementById("fb-data-generator").addEventListener('click', fbDataButton);





console.log("Spotify index file running");

