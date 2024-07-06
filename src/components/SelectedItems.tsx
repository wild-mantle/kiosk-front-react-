import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface SelectedItemsProps {
    selectedProducts: Product[];
    onClear: () => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ selectedProducts, onClear }) => {
    return (
        <div className="selected-items">
            <h2>Selected Products</h2>
            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index}>{product.name} - {product.price}원</li>
                ))}
            </ul>
            <button onClick={onClear}>전체삭제</button>
        </div>
    );
}

export default SelectedItems;
