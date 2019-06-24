import _ from 'lodash';
import GetUserID from "./GetUserID";
import FetchUserTracks from "./FetchUserTracks";
import ViewTopTracks from "./ViewTopTracks";
import ObtainNewToken from "./ObtainNewToken";
import GeneratePlaylist from "./GeneratePlaylist";
import ViewPlaylists from "./ViewPlaylists";
import GenerateReccomendations from "./GenerateReccomendations";
import ButtonCalls from "./ButtonCalls";
import SaveTimeData from "./SaveTimeData";
import SaveTrackAmount from "./SaveTrackAmount";

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());
  FetchUserTracks();
  GetUserID();
  ObtainNewToken();
  ViewTopTracks();
  ViewPlaylists();
  GeneratePlaylist();
  GenerateReccomendations();
  ButtonCalls();
  SaveTimeData();
  SaveTrackAmount();


  