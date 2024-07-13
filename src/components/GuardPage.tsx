// src/components/GuardPage.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './GuardPage.css'; // CSS 파일 추가

const GuardPage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleResetCustomerInfo = () => {
        authContext?.setCustomerInfo(null);
        navigate('/home');
    };

    return (
        <div className="guard-page">
            <h2>키오스크 화면 가드</h2>
            <button className="guard-button" onClick={handleResetCustomerInfo}>
                주문하기
            </button>
        </div>
    );
};

export default GuardPage;
