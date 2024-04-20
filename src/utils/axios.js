import axios from 'axios';

// http://localhost:5000/api
// https://coup-server-hls8.onrender.com/api
const clientAxios = axios.create({
    baseURL: 'https://coup-server-hls8.onrender.com/api'
});

export default clientAxios;