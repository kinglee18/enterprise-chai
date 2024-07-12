
import axios from 'axios';
import {cookies} from "next/headers";

const axiosInterceptorInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND
});

axiosInterceptorInstance.interceptors.request.use(
    (config) => {
        // Handle request headers here
        const token = cookies().get('token');
        console.table(
            config?.data
        )
        if (token && config?.url !== '/login' && config?.url !== '/register') {
            config.headers['Authorization'] = `Token ${token.value}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

axiosInterceptorInstance.interceptors.response.use(
    (response) => {
        console.table({
            data: response?.data,
            url: response?.config?.url,
            status: response?.status,
        });
        return response;
    },
    (error) => {
        console.table(
            {
                url: error.config?.url,
                status: error.response?.status,
                data: error.response?.data,
            }
        )
        return Promise.reject(error);
    }
);


export default axiosInterceptorInstance;
