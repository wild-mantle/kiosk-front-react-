import React from 'react';
import { Product, CustomOption } from '../types';

interface SelectedItemsProps {
    selectedProducts: Product[];
    onClear: () => void;
    onIncreaseQuantity: (productId: number, options: CustomOption[]) => void;
    onDecreaseQuantity: (productId: number, options: CustomOption[]) => void;
}

const groupOptions = (options: CustomOption[]) => {
    const groupedOptions: { [key: string]: number } = {};
    options.forEach(option => {
        if (groupedOptions[option.name]) {
            groupedOptions[option.name]++;
        } else {
            groupedOptions[option.name] = 1;
        }
    });
    return groupedOptions;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ selectedProducts, onClear, onIncreaseQuantity, onDecreaseQuantity }) => {
    const totalPrice = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="selected-items">
            <h2>Selected Products</h2>

            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index} className="selected-item">
                        <div className="item-details">
                            <span className="item-name">{product.name} - {product.price}원 (수량: {product.quantity})</span>
                            <div className="quantity-controls">
                                <button onClick={() => onIncreaseQuantity(product.id, product.options)}>+</button>
                                <button onClick={() => onDecreaseQuantity(product.id, product.options)}>-</button>
                            </div>
                        </div>
                        <ul>
                            {Object.entries(groupOptions(product.options)).map(([optionName, count], optIndex) => {
                                const optionPrice = product.options.find(opt => opt.name === optionName)?.additionalPrice ?? 0;
                                return (
                                    <li key={optIndex} className="option-name">{optionName} * {count} (+{optionPrice * count}원)</li>
                                );
                            })}
                        </ul>
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
