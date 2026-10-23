import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
});

export async function registerApi(email, password, username) {
    try {
        const response = await api.post('/register', { email, password, username });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
export async function loginApi(email, password) {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
export async function getme(email, password) {
    try {
        const response = await api.post('/getme', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}