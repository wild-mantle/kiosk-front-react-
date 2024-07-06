import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

interface SelectedItemsProps {
    selectedProducts: Product[];
    onClear: () => void;
    onIncreaseQuantity: (productId: number) => void;
    onDecreaseQuantity: (productId: number) => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ selectedProducts, onClear, onIncreaseQuantity, onDecreaseQuantity }) => {
    return (
        <div className="selected-items">
            <h2>Selected Products</h2>
            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index}>
                        {product.name} - {product.price}원 (수량: {product.quantity})
                        <button onClick={() => onIncreaseQuantity(product.id)}>+</button>
                        <button onClick={() => onDecreaseQuantity(product.id)}>-</button>
                    </li>
                ))}
            </ul>
            <button onClick={onClear}>전체삭제</button>
        </div>
    );
}

export default SelectedItems;
