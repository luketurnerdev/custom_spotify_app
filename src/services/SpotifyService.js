const axios = require("axios");
const queryString = require("query-string");
const usersController = require("./../controllers/users_controller")

//This service uses a singleton pattern to call an API, get authentication information, 
//and return access tokens / data. This can then be stored in cookies / session / DB.

//This file is exported a single instance of the class so that the same instance will be
// used no matter where it in the program it is accessed.

class spotifyService {

    //Setup an empty object to store token information
    constructor() {
        this.keys = {};
    }

    //Set a new pairing
    setItem(key, value) {
        return this.keys[key] = value;
    }

    //Retrieve an item from the object
    getItem(key) {
        return this.keys[key];
    }

    //This function takes a one-time code that is sent with the query params of the OAuth request
    //Note - other OAuth services might not use urlencoded requests - check their docs
    async getTokens(code) {
        console.log('get tokens ran');
        const config = { 
            headers: {"Content-Type": 'application/x-www-form-urlencoded'}
        };

    const body = queryString.stringify(
        {
            code: code,
            redirect_uri : process.env.REDIRECT_URI,
            grant_type : 'authorization_code',
            client_id : process.env.CLIENT_ID,
            client_secret : process.env.CLIENT_SECRET
        }
    )


        //Make a post request to ask for access using the body and config
        //In this axios format, the body MUST come before the config
        const response = await axios.post
        (
            'https://accounts.spotify.com/api/token',
            body,
            config
        )
        
        usersController.create()
        //The access tokens are returned as the response, to be used in HTTP requests etc
        return response.data;

    }

    //This is an example of a function that can be constructed using the newly available tokens

    async getUserData(accessToken) {

        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })


        //Return user profile information
        return response.data;
    }
}

module.exports = new spotifyService();