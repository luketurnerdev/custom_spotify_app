const GetHashParams = () => {
    
        console.log('Get hash params executed');
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        var access_token = hashParams.access_token;
    //   refresh_token = params.refresh_token,
    //   error = params.error;

      console.log('generated access token ' + access_token);


        return hashParams;

};

export default GetHashParams;