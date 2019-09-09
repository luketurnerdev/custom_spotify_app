//This is the main JS script. Other scripts will be imported here.

// import SpotifyInit from "./SpotifyInit";
// import {AccessToken} from "./SpotifyInit";
// import ViewTopTracks from "./ViewTopTracks";
import {viewPlaylists} from "./controllers/playlist_controller";
import {logout} from "./controllers/pages_controller";
import {getTopArtists} from "./controllers/user_data_controller"
// import ViewPlaylists from "./playlists/ViewPlaylists"
// import GeneratePlaylist from "./GeneratePlaylist";



// console.log(viewPlaylists())


//Setup button clicks

// document.getElementById('obtain-new-token').addEventListener('click', obtainNewToken, false);
// document.getElementById("view-top-tracks").addEventListener('click', ViewTopTracks);
// document.getElementById("generate-playlist").addEventListener('click', GeneratePlaylist);
document.getElementById("view-user-playlists").addEventListener('click', viewPlaylists);
document.getElementById("logout-button").addEventListener('click', logout);
document.getElementById("view-top-artists").addEventListener('click', getTopArtists);

//Saving the users selections for playlist options
// document.getElementById("time-selector").addEventListener('click', saveTimeData);
// document.getElementById("amount-of-tracks").addEventListener('click', saveTrackAmount);





console.log("Index.jssdfds file running");

