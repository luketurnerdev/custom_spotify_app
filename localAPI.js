import axios from "axios";

const LocalAPI = axios.create({
    baseURL: process.env.BACKEND_URI,
    withCredentials: true
});

// LocalAPI.setAuthHeader = function(token) {
//     this.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

export default LocalAPI;