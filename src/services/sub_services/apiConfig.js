/* --------------------------------Imports--------------------------------*/

import axios from "axios";

/* --------------------------------Variables--------------------------------*/

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

/* --------------------------------Functions--------------------------------*/

const getToken = () => {

    const token = localStorage.getItem('token');
    if (!token) return null;
    return `Bearer ${token}`;
    
};

const api = axios.create({
    baseURL: BACKEND_URL
});

api.interceptors.request.use(
    function (config) {
        const token = getToken();
        if (token) {
            console.log("Signed In")
            config.headers["Authorization"] = token;
        }
        return config;
    },
    
    function (error) {
        console.log("Request error: ", error);
        return Promise.reject(error);
    }
);

/* --------------------------------Exports--------------------------------*/

export default api;