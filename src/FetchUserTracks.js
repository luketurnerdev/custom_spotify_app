import {AccessToken} from "./SpotifyInit";
import SaveTrackAmount from "./SaveTrackAmount";
import SaveTimeData from "./SaveTimeData";

const FetchUserTracks = () => {
    let access_token = AccessToken();
    let selectedAmount = SaveTrackAmount();
    let selectedTime = SaveTimeData();
    return $.ajax({
        //Get the tracks with a specific limit and time range
        url: (`https://api.spotify.com/v1/me/top/tracks?time_range=${selectedTime}&limit=${selectedAmount}`) ,
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
    
          console.log('successfully fetched user tracks');
        }
      });
}

export default FetchUserTracks;
    