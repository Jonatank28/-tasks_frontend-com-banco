import axios from 'axios';

// Cria uma instância do axios com a URL base do backend
const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3333/api/' // URL do backend local
        : 'https://tasks.johncode.tech/api' // URL do backend de produção
});

export default api; 
