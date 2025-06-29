import axios from 'axios';
import { config } from 'process';

export const api = axios.create({
    baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if(token) config.headers.Authorization = `Bearer ${token}`;

    return config;
})