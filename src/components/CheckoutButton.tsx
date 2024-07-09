import React from 'react';
import { Product, OrderModuleDTO, PaymentStatus } from '../types';

interface CheckoutButtonProps {
    selectedProducts: Product[];
    totalPrice: number;
    onCheckoutClick: (orderData: OrderModuleDTO) => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ selectedProducts, totalPrice, onCheckoutClick }) => {
    const handleCheckout = () => {
        const orderData: OrderModuleDTO = {
            id: 1, // 이 값을 적절하게 설정하세요
            price: totalPrice,
            storeName: '1달러샵',
            email: 'customer@example.com',
            address: '서울시 강남구',
            status: PaymentStatus.PENDING,
            paymentUid: '',
            orderUid: `order_${new Date().getTime()}`,
        };

        console.log('Checkout data:', orderData);
        onCheckoutClick(orderData);
    };

    return (
        <button className="checkout-button" onClick={handleCheckout}>
            결제하기
        </button>
    );
};

export default CheckoutButton;
