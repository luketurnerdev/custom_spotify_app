const GetUerID = () => {

};

function getUserID() {

    return $.ajax({
      type: 'GET',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function(response) {
        //Returns the ID to be used by other functions
        
        userID = response.id;
        console.log('Lukes user id:' + response.id);
      }
    });
  }