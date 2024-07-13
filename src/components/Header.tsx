// src/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleResetCustomerInfo = () => {
        navigate('/guard');
    };

    return (
        <header className="header">
            <div className="home-icon">🏠</div>
            <h1>E1asy KIOSK</h1>
            <div className="settings-icon" >⚙️</div>
            <div className="guard-redirect-button" onClick={handleResetCustomerInfo}> 뒤로가기 </div>
        </header>
    );
}

export default Header;
