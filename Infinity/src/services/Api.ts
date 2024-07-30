import axios from "axios";

const api = axios.create({
    //baseURL: 'https://BaseUrlDaApi',
    //baseURL: 'http://localhost:5174'
    baseURL: 'http://localhost:4000'
  })

export default api;  