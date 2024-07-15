import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminLoginModalProps {
    onClose: () => void;
}

/**
 * AdminLoginModal 컴포넌트
 * - 관리자 로그인 모달
 * - 비밀번호 입력 후, 일치하면 관리자 대시보드로 전환
 * - 취소 버튼 클릭 시 모달을 닫음
 */
const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose }) => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (password === 'admin_password') { // 여기서 'admin_password'는 관리자 비밀번호입니다.
            navigate('/admin/dashboard'); // 관리자 대시보드로 전환합니다.
            onClose();
        } else {
            alert('잘못된 비밀번호입니다.');
        }
    };

    return (
        <div className="admin-login-modal">
            <h2>관리자 로그인</h2>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="관리자 비밀번호 입력"
            />
            <button onClick={handleLogin}>로그인</button>
            <button onClick={onClose}>취소</button>
        </div>
    );
};

export default AdminLoginModal;

// 이 코드는 현재 안쓰이는 코드 같네요.
