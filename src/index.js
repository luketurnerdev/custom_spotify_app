//This is the main JS script. Other scripts will be imported here.

import {viewPlaylists} from "./controllers/playlist_controller";
import {logout} from "./controllers/pages_controller";
import {topArtistsButton, setTrackHTML, reccomendationsButton} from "./controllers/user_data_controller"

document.getElementById("view-user-playlists").addEventListener('click', viewPlaylists);
document.getElementById("logout-button").addEventListener('click', logout);
document.getElementById("view-top-artists").addEventListener('click', topArtistsButton);
document.getElementById("view-top-tracks").addEventListener('click', setTrackHTML);
document.getElementById("generate-reccomendations").addEventListener('click', reccomendationsButton);




console.log("Index.jssdfds file running");

