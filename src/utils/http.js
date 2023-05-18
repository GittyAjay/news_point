import { baseURL, x_api_key } from '../../env.json'
import axios from 'axios';
import { Alert } from 'react-native'
const api = axios.create({
    baseURL
});
// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add default header to the request
        config.headers['x-api-key'] = x_api_key;

        // Add default parameters to the request
        config.params = {
            ...config.params,
            country: 'IN',
            pageSize: 100,
        };
        console.log("====request body", config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log("====response body", response);
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            if (response.status === 401) {
                Alert.alert("Unauthorized request")
            }
        } else {
            Alert.alert('Network or other error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
