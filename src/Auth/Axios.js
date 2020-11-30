import axios from "axios";
const Axios = axios.create({
    //Change url
    // baseURL: "https://classmarker-app.herokuapp.com/",
    baseURL: "http://localhost:5000/",

    //additional configurations
    // headers:{
    //     Authorization:`Bearer ${window.localStorage.getItem('token')}`
    // }
});
export default Axios;
