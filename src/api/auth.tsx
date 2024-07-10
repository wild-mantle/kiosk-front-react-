// src/api/auth.ts
import axios from './axiosConfig';

export const login = async (name: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8080/api/kk/kiosk/login', {
            name,
            password
        });
        return response.data; // 성공 시 JWT 토큰 반환
    } catch (error) {
        throw error;
    }
};
