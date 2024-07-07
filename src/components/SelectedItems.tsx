import React from 'react';

interface Product {
    id: number;
    name: string;
    basePrice: number;
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
    const totalPrice = selectedProducts.reduce((total, product) => total + product.basePrice * product.quantity, 0);

    return (
        <div className="selected-items">
            <h2>Selected Products</h2>
            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index} className="selected-item">
                        <span className="item-name">{product.name} - {product.basePrice}원 (수량: {product.quantity})</span>
                        <div className="quantity-controls">
                            <button onClick={() => onIncreaseQuantity(product.id)}>+</button>
                            <button onClick={() => onDecreaseQuantity(product.id)}>-</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="total-price">
                <strong>Total Price: {totalPrice}원</strong>
            </div>
            <button onClick={onClear}>전체삭제</button>
        </div>
    );
}

export default SelectedItems;
