const User = require("../database/models/user_model");
/*  
 *   a user in the database using the access_token stored in cookies.
 *  If unsuccessful, call error handler middleware.
 */
async function findUserByToken(req, next){
  try {
    // check tokens cookie
    if (!req.cookies.tokens) throw new HTTPError(404, "Missing 'tokens' cookie.");
    // get access token from cookies
    let accessToken = req.cookies.tokens.access_token;
    // check the token
    if (!accessToken) throw new HTTPError(404, "Missing user's access_token.");

    //  user with access token
    return await User
      .findOne({ access_token: accessToken })
      .then(resp => {
        // check the response
        if (!resp) throw new HTTPError(404, "User not found.")
        else {
          return resp;
        } 
      })
    } catch(err) {
      // If errors, return with error middleware
      return (err);
      
  };
}

module.exports = findUserByToken;