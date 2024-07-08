import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
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

    useEffect(() => {
        axios.get(`http://localhost:8080/api/menus/select-custom-option/${menuId}`)
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the custom options!', error);
            });
    }, [menuId]);

    // 모달이 열릴 때마다 선택된 옵션의 수량 초기화
    useEffect(() => {
        if (isOpen) {
            setSelectedOptions({});
        }
    }, [isOpen]);

    const handleAddOption = (option: CustomOption) => {
        const newSelectedOptions = { ...selectedOptions, [option.id]: (selectedOptions[option.id] || 0) + 1 };
        setSelectedOptions(newSelectedOptions);
        onAddOption(option);
    };

    const handleRemoveOption = (option: CustomOption) => {
        if (selectedOptions[option.id]) {
            const newSelectedOptions = { ...selectedOptions, [option.id]: selectedOptions[option.id] - 1 };
            if (newSelectedOptions[option.id] === 0) {
                delete newSelectedOptions[option.id];
            }
            setSelectedOptions(newSelectedOptions);
            onRemoveOption(option);
        }
    };

    const handleClose = () => {
        onRequestClose();
    };

    const handleCancel = () => {
        onRequestCancel();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={handleCancel} contentLabel="Custom Options">
            <h2>추가 옵션 선택</h2>
            <div className="custom-options">
                {options.length === 0 ? (
                    <p>없음</p>
                ) : (
                    options.map(option => (
                        <div key={option.id} className="custom-option">
                            <span>{option.name}</span>
                            <span>{option.additionalPrice}원</span>
                            <span>수량: {selectedOptions[option.id] || 0}</span>
                            <button onClick={() => handleAddOption(option)}>추가</button>
                            <button onClick={() => handleRemoveOption(option)}>제거</button>
                        </div>
                    ))
                )}
            </div>
            <button onClick={handleClose}>완료</button>
            <button onClick={handleCancel}>취소</button>
        </Modal>
    );
};

export default CustomOptionModal;
