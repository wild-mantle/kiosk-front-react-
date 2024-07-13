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
    isValid: boolean;
    points: number;
    handleUsePoints: () => void;
    handleSkipPoints: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
                                                         isOpen,
                                                         onRequestClose,
                                                         password,
                                                         setPassword,
                                                         handlePasswordSubmit,
                                                         isValid,
                                                         points,
                                                         handleUsePoints,
                                                         handleSkipPoints
                                                     }) => {
    const keyboardOptions = {
        layout: {
            default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
        },
        display: {
            '{bksp}': '지우기',
        },
    };

    const handleInputChange = (input: string) => {
        setPassword(input);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="비밀번호 입력"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
            {isValid ? (
                <div>
                    <h2>잔여 포인트: {points}</h2>
                    <button className="modal-submit-button" onClick={handleUsePoints}>
                        포인트 사용
                    </button>
                    <button className="modal-submit-button" onClick={handleSkipPoints}>
                        포인트 사용 안함
                    </button>
                </div>
            ) : (
                <div>
                    <h2>비밀번호 입력</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 입력"
                    />
                    <Keyboard
                        layout={keyboardOptions.layout}
                        display={keyboardOptions.display}
                        onChange={handleInputChange}
                        onKeyPress={() => {}}
                    />
                    <button className="modal-submit-button" onClick={handlePasswordSubmit}>
                        다음
                    </button>
                </div>
            )}
            <button className="modal-close-button" onClick={onRequestClose}>
                닫기
            </button>
        </Modal>
    );
};

export default PasswordModal;
