import React from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    basePrice: number;
    quantity: number;
}

interface CheckoutButtonProps {
    selectedProducts: Product[];
    totalPrice: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ selectedProducts, totalPrice }) => {
    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/test/payment', {
                products: selectedProducts,
                totalPrice: totalPrice
            });
            alert('Payment Successful!');
        } catch (error) {
            console.error('There was an error processing the payment!', error);
            alert('Payment Failed.');
        }
    };

    return (
        <button className="checkout-button" onClick={handleCheckout}>
            결제하기
        </button>
    );
}

export default CheckoutButton;
