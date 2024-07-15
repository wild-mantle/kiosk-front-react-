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

export const fetchStoreInfo = async (adminId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/kk/store/${adminId}`);
        return response.data; // 성공 시 상점 정보 반환
    } catch (error) {
        throw error;
    }
};
