import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { login, fetchStoreInfo } from '../api/auth';

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { message, adminId } = await login(username, password);
            authContext?.login();
            localStorage.setItem('adminId', adminId.toString()); // adminId 저장
            localStorage.setItem('adminPassword', password); // 비밀번호 저장

            // 로그인 후 adminId로 상점 정보 가져오기
            const storeInfo = await fetchStoreInfo(adminId);
            authContext?.setStoreInfo(storeInfo);

            navigate('/kiosk-selection'); // 로그인 후 키오스크 선택 페이지로 이동
        } catch (err) {
            setError('Invalid name or password');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>로그인</button>
            <p>계정이 없으신가요? <Link to="/sign_up">회원가입</Link></p>
        </div>
    );
};

export default Login;
