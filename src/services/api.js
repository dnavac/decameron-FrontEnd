import axios from "axios";

//Api para la comunicación con el backend
const api = axios.create({
    baseURL: 'https://decameron-backend-test.laravel.cloud/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;