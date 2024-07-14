// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Store {
    id: number;
    name: string;
    location: string;
    adminID: number;
}

interface Kiosk {
    id: number;
    number: string;
}

interface Customer {
    id: number;
    name: string;
    phoneNumber: string;
    points: number;
    email: string;
    address: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    storeInfo: Store | null;
    setStoreInfo: (info: Store | null) => void;
    kioskInfo: Kiosk | null;
    setKioskInfo: (info: Kiosk | null) => void;
    customerInfo: Customer | null;
    setCustomerInfo: (info: Customer | null) => void;
    usePointSwitch: boolean;
    setUsePointSwitch: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [storeInfo, setStoreInfo] = useState<Store | null>(null);
    const [kioskInfo, setKioskInfo] = useState<Kiosk | null>(null);
    const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
    const [usePointSwitch, setUsePointSwitch] = useState<boolean>(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        setStoreInfo(null); // 로그아웃 시 상점 정보 초기화
        setKioskInfo(null); // 로그아웃 시 키오스크 정보 초기화
        setCustomerInfo(null); // 로그아웃 시 고객 정보 초기화
        setUsePointSwitch(false); // 로그아웃 시 포인트 사용 스위치 초기화
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, storeInfo, setStoreInfo, kioskInfo, setKioskInfo, customerInfo, setCustomerInfo, usePointSwitch, setUsePointSwitch }}>
            {children}
        </AuthContext.Provider>
    );
};
