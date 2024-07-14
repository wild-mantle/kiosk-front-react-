// src/components/GuardPage.tsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const GuardPage: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        // GuardPage로 돌아갈 때 usePointSwitch 초기화
        authContext?.setUsePointSwitch(false);
    }, [authContext]);

    return (
        <div>
            {/* GuardPage의 내용 */}
        </div>
    );
};

export default GuardPage;
