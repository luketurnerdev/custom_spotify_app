const AuthorizeUser = () => {
    //Send a request to spotify auth page
    //User logs in
    const client_id = "d9cca6b8ff4248c9a2161fd2e94bacc0";

    //Request the user info
    axios.get('/user', {
        params: {
        client_id: client_id;
        }
        })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });  
}

export default AuthorizeUser;