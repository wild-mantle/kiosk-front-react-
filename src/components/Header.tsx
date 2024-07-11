import React, { useState } from 'react';
import AdminLoginModal from './admin/AdminLoginModal';

const Header: React.FC = () => {
    const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

    const handleAdminClick = () => {
        setIsAdminLoginOpen(true);
    };

    const handleAdminLoginClose = () => {
        setIsAdminLoginOpen(false);
    };

    return (
        <header className="header">
            <div className="home-icon">🏠</div>
            <h1>Easy KIOSK</h1>
            <div className="settings-icon" onClick={handleAdminClick}>⚙️</div>
            {isAdminLoginOpen && <AdminLoginModal onClose={handleAdminLoginClose} />}
        </header>
    );
}

export default Header;
