import React, { useState } from 'react';

interface EditProductModalProps {
    product: { name: string, category: string, price: number, options: string[], tags: string };
    onSave: (product: { name: string, category: string, price: number, options: string[], tags: string }) => void;
    onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onSave, onClose }) => {
    const [productName, setProductName] = useState(product.name);
    const [productCategory, setProductCategory] = useState(product.category);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productOptions, setProductOptions] = useState(product.options);
    const [productTags, setProductTags] = useState(product.tags);

    const handleSave = () => {
        onSave({
            name: productName,
            category: productCategory,
            price: productPrice,
            options: productOptions,
            tags: productTags
        });
        onClose();
    };

    return (
        <div>
            <h3>상품 수정</h3>
            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="상품 이름"
            />
            <input
                type="text"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="카테고리"
            />
            <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                placeholder="가격"
            />
            <input
                type="text"
                value={productTags}
                onChange={(e) => setProductTags(e.target.value)}
                placeholder="태그"
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={onClose}>취소</button>
        </div>
    );
};

export default EditProductModal;
