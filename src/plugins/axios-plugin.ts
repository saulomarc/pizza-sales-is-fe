import axios from 'axios'
import { useAuthStore } from '../stores/auth';
import { useAlertStore } from '@/stores/alert';

const instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE
})

instance.interceptors.request.use(
    (config) => {
        const token = useAuthStore().token;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response
    },

    async (error) => {
        if (error.response && error.response.status === 401  && error.response.data.message == 'Unauthenticated.') {
            useAuthStore().logout()
        } else if (error.status != 500) {
            useAlertStore().error(error.response?.data.message)
        }
        return Promise.reject(error);
    }
);

export default instance;