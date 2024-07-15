import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginModal from '../admin/AdminLoginModal';

const Header: React.FC = () => {
    const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
    const navigate = useNavigate ();

    const handleAdminClick = () => {
        setIsAdminLoginOpen(true);
    };

    const handleAdminLoginClose = () => {
        setIsAdminLoginOpen(false);
    };

    const handleMainPage = () => {
        navigate('/guard');
    };

    return (
        <header className="header">
            <div className="home-icon" onClick={handleMainPage}>🏠</div>
            <h1>Easy KIOSK</h1>
            <div className="settings-icon" onClick={handleAdminClick}>⚙️</div>
            {isAdminLoginOpen && <AdminLoginModal onClose={handleAdminLoginClose} />}
        </header>
    );
}

export default Header;
