import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
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