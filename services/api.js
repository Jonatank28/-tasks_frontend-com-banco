import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/api',

    // baseURL: 'https://tasks.johncode.tech/api',
});

export default api; 
