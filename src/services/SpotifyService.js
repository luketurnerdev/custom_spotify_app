const axios = require("axios");
const queryString = require("query-string");

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
        const config = { headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }};
    
        //Client auth information to be used in the body.
        //Use queryString.stringify to convert this information to url-encoded from JSON.
        const body = queryString.stringify({
            'client_id': process.env.CLIENT_ID,
            'client_secret':process.env.CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'redirect_uri': process.env.REDIRECT_URI,
            'code': code
        });

        //Make a post request to ask for access using the config and body
        const response = await axios.post
        (
            'https://secure.meetup.com/oauth2/access',
            body,
            config
        );
        //The access tokens are returned as the response, to be used in HTTP requests etc
        return response.data;

        
    }

    //This is an example of a function that can be constructed using the newly available tokens

    async getUserInfo(accessToken) {
        const response = await axios.get('https://api.meetup.com/members/self', {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return response.data;
    }
}

module.exports = new meetupService();