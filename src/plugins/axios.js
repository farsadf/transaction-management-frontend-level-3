import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://infra.devskills.app/api/accounting'
});

export default axiosInstance
