import axios from 'axios'

export const BASE_URL = 'http://localhost:8080';

const instance = axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    }
})

// Adicionar este Interceptor:
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // O formato esperado pelo backend é "Bearer [token]"
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance