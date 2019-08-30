//This is the main JS script. Other scripts will be imported here.

import SpotifyInit from "./SpotifyInit";
import {AccessToken} from "./SpotifyInit";
import ViewTopTracks from "./ViewTopTracks";
// import playlistController from "./controllers/playlist_controller";
import ViewPlaylists from "./playlists/ViewPlaylists"
import GeneratePlaylist from "./GeneratePlaylist";
import {getUserTokens} from "./controllers/auth_controller"



// ObtainNewToken();
/// RUN DEFAULT SPOTIFY CODE ///
// SpotifyInit();

//Setup button clicks

// document.getElementById('obtain-new-token').addEventListener('click', obtainNewToken, false);
// document.getElementById("view-top-tracks").addEventListener('click', ViewTopTracks);
// document.getElementById("generate-playlist").addEventListener('click', GeneratePlaylist);
document.getElementById("view-user-playlists").addEventListener('click', getUserTokens);

//Saving the users selections for playlist options
// document.getElementById("time-selector").addEventListener('click', saveTimeData);
// document.getElementById("amount-of-tracks").addEventListener('click', saveTrackAmount);





console.log('Index.js file rasdasdan');

