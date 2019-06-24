import GetHashParams from ("./GetHashParams");

//Create instance of 'me' endpoint for user verification data etc
const SpotifyMe = axios.create({
    baseURL: 'https://api.spotify.com/v1/me',
    timeout: 1000,
    headers: {
        'Authorization': 'Bearer ' + access_token
    }
  });

  export default SpotifyMe;