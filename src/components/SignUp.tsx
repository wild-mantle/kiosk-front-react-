import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            await axios.post('http://localhost:8080/api/kk/kiosk/sign_up', {
                name: username,
                password,
                email
            });
            setMessage('Sign up successful');
            navigate('/login');
        } catch (err) {
            setMessage('Sign up failed');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            {message && <p style={{ color: message === 'Sign up successful' ? 'green' : 'red' }}>{message}</p>}
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
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSignUp}>회원가입</button>
        </div>
    );
};

export default SignUp;
