import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const token = await login(username, password);
            authContext?.login();
            localStorage.setItem('token', token); // JWT 토큰 저장
            navigate('/main');
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
