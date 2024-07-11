import React, { useState } from 'react';

interface AddOptionModalProps {
    onAdd: (name: string) => void;
    onClose: () => void;
}

const AddOptionModal: React.FC<AddOptionModalProps> = ({ onAdd, onClose }) => {
    const [optionName, setOptionName] = useState('');

    const handleAdd = () => {
        onAdd(optionName);
        setOptionName('');
    };

    return (
        <div>
            <h3>옵션 추가</h3>
            <input
                type="text"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
                placeholder="옵션 이름"
            />
            <button onClick={handleAdd}>저장</button>
            <button onClick={onClose}>취소</button>
        </div>
    );
};

export default AddOptionModal;
