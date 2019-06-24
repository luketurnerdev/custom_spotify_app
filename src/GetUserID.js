// import GetHashParams from ("./GetHashParams");
// console.log(GetHashParams());
const axios = require('axios');
const GetUserID = () => {

// console.log('executed get user id');
// const params = GetHashParams();
// console.log(params);
    // Fetch the user ID
    // return $.ajax({
    //     type: 'GET',
    //     url: 'https://api.spotify.com/v1/me',
    //     headers: {
    //       'Authorization': 'Bearer ' + access_token
    //     },
    //     success: function(response) {
    //       //Returns the ID to be used by other functions
          
    //       userID = response.id;
    //       console.log('Lukes user id:' + response.id);
    //     }
    //   });



      //


      const GetUserID = async function() {
        try {
          const response = await axios.get('/user?ID=12345');
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
};

export default GetUserID;