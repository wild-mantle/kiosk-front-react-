import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/kioskMain.css'; // 스타일링을 위한 CSS 파일

const KioskMain: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="kiosk-main">
            <h1>Welcome to Easy KIOSK</h1>
            <div className="button-container">
                <button onClick={() => handleNavigation('/menu')} className="kiosk-button">
                    주문하기
                </button>
            </div>
        </div>
    );
};

export default KioskMain;
