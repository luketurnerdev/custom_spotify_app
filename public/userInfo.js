//Get the user's profile
import {access_token} from "./script.js";
var userID = "";

export function getUserID() {
    $.ajax({
        //Get the tracks with a specific limit and time range
        url: ('https://api.spotify.com/v1/me') ,
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
    
            console.log(response);

        }
    });
}
