
import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = 'Bearer ' + token
    return config;
})
axiosClient.interceptors.response.use((response) => {
    console.log(response)
    return response;
}, (error) => {
    try {
        const { response } = error;
        if (response.status == 401) {
            localStorage.removeItem('ACCESS_TOKEN')
        }
        // console.log(error);
        console.log(response);
    } catch (e) {
        console.error(e);
    }
    throw error;
})
export default axiosClient;