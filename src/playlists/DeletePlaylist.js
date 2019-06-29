import {AccessToken} from "./../SpotifyInit";
//Delete the playlist with the playlist's ID as an argument
const DeletePlaylist = () => {
    //Get playlist ID from the button that was clicked 
    let id = event.target.id;
    let access_token = AccessToken();
    if (confirm('Are you sure you want to delete this playlist?')) {
  
      //DELETE request
      $.ajax({
        type: 'DELETE',
        url: `https://api.spotify.com/v1/playlists/${id}/followers`,
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
          //Returns the ID to be used by other functions
          
          // userID = response.id;
          console.log('Playlist successfully deleted');
        }
    });
  
    //Remove the HTML
    let deletedPlaylist = document.getElementById(id);
    deletedPlaylist.parentNode.removeChild(deletedPlaylist);
  
  
    } else {
      console.log('not deleted');
    }
  
  }

  export default DeletePlaylist;