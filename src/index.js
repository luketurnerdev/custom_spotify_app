//This is the main JS script. Other scripts will be imported here.

import SpotifyInit from "./SpotifyInit";
import {AccessToken} from "./SpotifyInit";
import ViewTopTracks from "./ViewTopTracks";
import ViewPlaylists from "./ViewPlaylists";

// ObtainNewToken();
SpotifyInit();





//Setup button clicks

// document.getElementById('obtain-new-token').addEventListener('click', obtainNewToken, false);
document.getElementById("view-top-tracks").addEventListener('click', ViewTopTracks);

// document.getElementById("generate-playlist").addEventListener('click', generatePlaylist);
document.getElementById("view-user-playlists").addEventListener('click', ViewPlaylists);

//Saving the users selections for playlist options
// document.getElementById("time-selector").addEventListener('click', saveTimeData);
// document.getElementById("amount-of-tracks").addEventListener('click', saveTrackAmount);


/// RUN DEFAULT SPOTIFY CODE ///

//Debug 
// ViewPlaylists();




console.log('Index.js file ran');

