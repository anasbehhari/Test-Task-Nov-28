import axios from "axios";

export default axios.create({
    baseURL : "http://localhost:2001" || process.env.REACT_APP_BASE_URL 
})