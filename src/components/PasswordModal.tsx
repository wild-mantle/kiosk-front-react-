import React from 'react';
import Modal from 'react-modal';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './PasswordModal.css';

interface PasswordModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handlePasswordSubmit: () => void;
    confirm?: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
                                                         isOpen,
                                                         onRequestClose,
                                                         password,
                                                         setPassword,
                                                         handlePasswordSubmit,
                                                         confirm
                                                     }) => {
    const keyboardOptions = {
        layout: {
            default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
        },
        display: {
            '{bksp}': '지우기',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="비밀번호 입력"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
            <h2>{confirm ? '비밀번호 재확인' : '비밀번호 입력'}</h2>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
            />
            <Keyboard
                layout={keyboardOptions.layout}
                display={keyboardOptions.display}
                onChange={setPassword}
                onKeyPress={() => {}}
            />
            <button className="modal-submit-button" onClick={handlePasswordSubmit}>
                {confirm ? '확인' : '다음'}
            </button>
            <button className="modal-close-button" onClick={onRequestClose}>
                닫기
            </button>
        </Modal>
    );
};

export default PasswordModal;
