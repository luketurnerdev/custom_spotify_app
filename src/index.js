//This is the main JS script. Other scripts will be imported here.

import {viewPlaylists} from "./controllers/playlist_controller";
import {logout} from "./controllers/pages_controller";
import {topArtistsButton, setTrackHTML, reccomendationsButton, fbDataButton} from "./controllers/user_data_controller"

// document.getElementById("view-user-playlists").addEventListener('click', viewPlaylists);
document.getElementById("view-user-playlists").addEventListener('click', () => {
  alert('asda');
});
document.getElementById("logout-button").addEventListener('click', logout);
document.getElementById("view-top-artists").addEventListener('click', topArtistsButton);
document.getElementById("view-top-tracks").addEventListener('click', setTrackHTML);
document.getElementById("generate-reccomendations").addEventListener('click', reccomendationsButton);
document.getElementById("fb-data-generator").addEventListener('click', () => {
  alert('hl');
});




console.log("Spotify index file running");

