import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from '../api/axiosConfig';
import { CustomOption, Product } from '../types';

interface CustomOptionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onRequestCancel: () => void;
    menuId: number;
    selectedProduct: Product;
    onAddOption: (option: CustomOption) => void;
    onRemoveOption: (option: CustomOption) => void;
}

const CustomOptionModal: React.FC<CustomOptionModalProps> = ({
                                                                 isOpen,
                                                                 onRequestClose,
                                                                 onRequestCancel,
                                                                 menuId,
                                                                 selectedProduct,
                                                                 onAddOption,
                                                                 onRemoveOption
                                                             }) => {
    const [options, setOptions] = useState<CustomOption[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
    const [selectedSize, setSelectedSize] = useState('medium'); // Default size
    const [sizeOptionsAvailable, setSizeOptionsAvailable] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(selectedProduct.price);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/menus/select-custom-option/${menuId}`)
            .then(response => {
                const options: CustomOption[] = response.data;
                setOptions(options);
                setSizeOptionsAvailable(options.some((opt: CustomOption) => ['large', 'medium', 'small'].includes(opt.name)));
                if (options.length === 0) {
                    onRequestClose();
                }
            })
            .catch(error => {
                console.error('There was an error fetching the custom options!', error);
            });
    }, [menuId]);

    useEffect(() => {
        if (isOpen) {
            setSelectedOptions({});
            setTotalPrice(selectedProduct.price); // Reset price when modal opens
        }
    }, [isOpen]);

    const handleAddOption = (option: CustomOption) => {
        if (option.name.includes('추가')) {
            const newSelectedOptions = { ...selectedOptions, [option.id]: (selectedOptions[option.id] || 0) + 1 };
            setSelectedOptions(newSelectedOptions);
            setTotalPrice(totalPrice + option.additionalPrice);
            onAddOption(option);
        }
    };

    const handleRemoveOption = (option: CustomOption) => {
        if (option.name.includes('추가') && selectedOptions[option.id]) {
            const newSelectedOptions = { ...selectedOptions, [option.id]: selectedOptions[option.id] - 1 };
            if (newSelectedOptions[option.id] === 0) {
                delete newSelectedOptions[option.id];
            }
            setSelectedOptions(newSelectedOptions);
            setTotalPrice(totalPrice - option.additionalPrice);
            onRemoveOption(option);
        }
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
        const sizePriceDifference = getSizeAdditionalPrice(size) - getSizeAdditionalPrice(selectedSize);
        setTotalPrice(totalPrice + sizePriceDifference);
    };

    const handleClose = () => {
        onRequestClose();
    };

    const handleCancel = () => {
        onRequestCancel();
    };

    const getSizeAdditionalPrice = (size: string) => {
        switch (size) {
            case 'large':
                return 500;
            case 'medium':
                return 0;
            case 'small':
                return -400;
            default:
                return 0;
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={handleCancel} contentLabel="Custom Options">
            <h2>추가 옵션 선택</h2>
            <div className="custom-options">
                {options.filter(opt => !['large', 'medium', 'small'].includes(opt.name)).map(option => (
                    <div key={option.id} className="custom-option">
                        <span>{option.name}</span>
                        <span>{option.additionalPrice}원</span>
                        {option.name.includes('추가') ? (
                            <>
                                <span>수량: {selectedOptions[option.id] || 0}</span>
                                <button onClick={() => handleAddOption(option)}>추가</button>
                                <button onClick={() => handleRemoveOption(option)}>제거</button>
                            </>
                        ) : (
                            <input
                                type="radio"
                                id={`option-${option.id}`}
                                name="custom-option"
                                value={option.name}
                                onChange={() => handleAddOption(option)}
                            />
                        )}
                    </div>
                ))}
                {sizeOptionsAvailable && (
                    <div className="size-options">
                        <h3>사이즈 선택</h3>
                        {['large', 'medium', 'small'].map(size => {
                            const additionalPrice = getSizeAdditionalPrice(size);
                            return (
                                <div key={size} className="size-option">
                                    <input
                                        type="radio"
                                        id={size}
                                        name="size"
                                        value={size}
                                        checked={selectedSize === size}
                                        onChange={() => handleSizeChange(size)}
                                    />
                                    <label htmlFor={size}>{size}</label>
                                    <span>{additionalPrice}원</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="total-price">
                <strong>총 가격: {totalPrice}원</strong>
            </div>
            <button onClick={handleClose}>완료</button>
            <button onClick={handleCancel}>취소</button>
        </Modal>
    );
};

export default CustomOptionModal;
