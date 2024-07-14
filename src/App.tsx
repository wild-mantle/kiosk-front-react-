import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import KioskMain from "./components/KioskMain";
import MenuHome from './components/menu/MenuHome';
import SignUp from './components/SignUp';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/users/login" element={<Login />} />
                <Route path="/sign_up" element={<SignUp />} />
                <Route path="/main" element={<PrivateRoute component={<KioskMain />} />} />
                <Route path="/menu" element={<PrivateRoute component={<MenuHome />} />} />
                <Route path="*" element={<Navigate to="/users/login" />} />
            </Routes>
        </AuthProvider>
    );
};

const PrivateRoute: React.FC<{ component: JSX.Element }> = ({ component }) => {
    const authContext = useContext(AuthContext);
    return authContext?.isAuthenticated ? component : <Navigate to="/users/login" />;
};

export default App;
