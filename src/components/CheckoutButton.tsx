import React, {useContext} from 'react';
import { Product, OrderModuleDTO, PaymentStatus } from '../types';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface CheckoutButtonProps {
    selectedProducts: Product[];
    totalPrice: number;
    onCheckoutClick: (orderData: OrderModuleDTO) => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ selectedProducts, totalPrice, onCheckoutClick }) => {
    const handleCheckout = () => {
        const adminName = localStorage.getItem('adminId');
        axios.get(`http://localhost:8080/api/request_payment/check_out/${adminName}`)
            .then(response => {
                const data = response.data;
                console.log(data);
                const orderData: OrderModuleDTO = {
                    id: data.id, // 이 값을 적절하게 설정하세요
                    price: totalPrice,
                    storeName: data.storeName,
                    email: data.email,
                    address: data.address,
                    status: data.status,
                    paymentUid: '',
                    orderUid: data.orderUid
                };

                console.log('Checkout data:', orderData);
                onCheckoutClick(orderData);
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <button className="checkout-button" onClick={handleCheckout}>
            결제하기
        </button>
    );
};

export default CheckoutButton;
