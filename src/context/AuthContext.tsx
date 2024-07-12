import React, { createContext, useState, ReactNode } from 'react';

interface Store {
    id: number;
    name: string;
    location: string;
    adminID: number;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    storeInfo: Store | null;
    setStoreInfo: (store: Store) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [storeInfo, setStoreInfo] = useState<Store | null>(null);

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        setStoreInfo(null); // 로그아웃 시 상점 정보 초기화
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, storeInfo, setStoreInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
