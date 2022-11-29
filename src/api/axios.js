import axios from "axios";

export default axios.create({
    baseURL : "https://test-task-nov-28-api.vercel.app/" || import.meta.env.VITE_APP_BASE_URL
})