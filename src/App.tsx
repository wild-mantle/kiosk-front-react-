import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import MenuHome from './components/menu/MenuHome';
import SignUp from './components/SignUp';
import PaymentPage from './components/PaymentPage'; // PaymentPage 추가
import KioskSelectionPage from './components/KioskSelectionPage'; // KioskSelectionPage 추가
import GuardPage from './components/GuardPage'; // GuardPage 추가

const App: React.FC = () => {
    return (
        <AuthProvider>
                <Routes>
                    <Route path="/users/login" element={<Login />} />
                    <Route path="/sign_up" element={<SignUp />} />
                    <Route path="/kiosk-selection" element={<PrivateRoute component={<KioskSelectionPage />} />} /> {/* KioskSelectionPage 경로 추가 */}
                    <Route path="/menu" element={<PrivateRoute component={<MenuHome />} />} />
                    <Route path="/payment" element={<PrivateRoute component={<PaymentPage />} />} /> {/* PaymentPage 경로 추가 */}
                    <Route path="/guard" element={<PrivateRoute component={<GuardPage />} />} /> {/* GuardPage 경로 추가 */}
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
