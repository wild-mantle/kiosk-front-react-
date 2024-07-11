import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { OrderModuleDTO } from '../types';
import { loadScript } from './LoadScript';

interface PaymentModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    orderData: OrderModuleDTO;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onRequestClose, orderData }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        const loadIamportScript = async () => {
            try {
                await loadScript('https://cdn.iamport.kr/v1/iamport.js');
                await loadScript('https://code.jquery.com/jquery-1.12.4.min.js');
                setIsScriptLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        loadIamportScript();
    }, []);  // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

    useEffect(() => {
        const sendOrderData = async () => {
            try {
                console.log('Sending order data:', orderData);
                const formattedOrderData = {
                    ...orderData,
                    price: orderData.price.toString() // Long 타입으로 맞춤
                };

                const response = await axios.post('http://localhost:8080/api/request_payment/check_out', formattedOrderData);
                console.log('Order data sent successfully:', response.data);
            } catch (error) {
                console.error('Failed to send order data:', error);
            }
        };
        // 이거 경고 어떻하지?? - 2024-07-10 윤성빈
        if (isOpen && isScriptLoaded) {
            sendOrderData();
        }
    }, [isOpen, isScriptLoaded, orderData]);  // isOpen과 isScriptLoaded가 변경될 때만 실행

    const requestPay = () => {
        if (window.IMP) {
            const { IMP } = window;
            IMP.init('imp55148327'); // 가맹점 식별코드

            IMP.request_pay(
                {
                    pg: 'html5_inicis.INIpayTest',
                    pay_method: 'card',
                    merchant_uid: orderData.orderUid, // 주문 번호
                    name: orderData.storeName, // 상품 이름
                    amount: orderData.price, // 상품 가격
                    buyer_email: orderData.email, // 구매자 이메일
                    buyer_name: orderData.storeName, // 구매자 이름
                    buyer_tel: '010-1234-5678', // 임의의 값
                    buyer_addr: orderData.address, // 구매자 주소
                    buyer_postcode: '123-456', // 임의의 값
                },
                async (rsp: any) => {
                    if (rsp.success) {
                        alert('결제 성공: ' + JSON.stringify(rsp));
                        try {
                            const response = await axios.post('/payment', {
                                payment_uid: rsp.imp_uid, // 결제 고유번호
                                order_uid: rsp.merchant_uid, // 주문번호
                            });
                            console.log(response.data);
                            alert('결제 완료!');
                        } catch (error) {
                            console.error('결제 검증 실패:', error);
                            alert('결제 검증 실패!');
                        }
                    } else {
                        alert('결제 실패: ' + rsp.error_msg);
                    }
                }
            );
        } else {
            console.error('Iamport object is not found.');
        }
    };

    const testPostConnection = async () => {
        try {
            const testData = {
                id: 1,
                price: "1000", // 문자열로 변환
                storeName: "Test Store",
                email: "test@example.com",
                address: "123 Test St",
                status: "READY",
                paymentUid: "test_payment_uid",
                orderUid: "test_order_uid"
            };

            const response = await axios.post('http://localhost:8080/api/request_payment/check_out', testData);
            console.log('Response from server:', response.data);
            alert('POST request successful');
        } catch (error) {
            console.error('Error connecting to the server:', error);
            alert('POST request failed');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="결제 모달">
            <h2>결제 페이지</h2>
            <button onClick={requestPay} disabled={!isScriptLoaded}>결제하기</button>
            <button onClick={testPostConnection}>POST 테스트</button>
            <button onClick={onRequestClose}>닫기</button>
        </Modal>
    );
};

export default PaymentModal;
