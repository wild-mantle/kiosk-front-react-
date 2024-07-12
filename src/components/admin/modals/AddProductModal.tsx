import React, { useState } from 'react';

interface AddProductModalProps {
    onAdd: (name: string) => void;
    onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onAdd, onClose }) => {
    const [productName, setProductName] = useState('');

    const handleAdd = () => {
        onAdd(productName);
        setProductName('');
    };

    return (
        <div>
            <h3>상품 추가</h3>
            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="상품 이름"
            />
            <button onClick={handleAdd}>저장</button>
            <button onClick={onClose}>취소</button>
        </div>
    );
};

export default AddProductModal;
