const axios = require("axios");
export async function viewPlaylists(req, res) {
    const userInfo = await axios.get("/auth/getuser")
    .then(resp => {
        console.log(resp);
    })
    .catch(err => {
        console.log(err);
    })

    console.log(userInfo);
    // res.redirect("/")
  
}
// export default viewPlaylists;