import React, { useState } from 'react';

interface AddCategoryModalProps {
    onAdd: (name: string) => void;
    onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onAdd, onClose }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleAdd = () => {
        onAdd(categoryName);
        setCategoryName('');
    };

    return (
        <div>
            <h3>카테고리 추가</h3>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="카테고리 이름"
            />
            <button onClick={handleAdd}>저장</button>
            <button onClick={onClose}>취소</button>
        </div>
    );
};

export default AddCategoryModal;
