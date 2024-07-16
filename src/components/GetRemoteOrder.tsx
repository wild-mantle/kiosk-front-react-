import React, { useEffect } from 'react';
import { Product, PaymentStatus } from '../types';
import axios from "axios";
import {loadScript} from "./LoadScript";
// import {clearInterval} from "node:timers";

interface OrderModuleDTO {
    id: number;
    price: number;
    storeName: string;
    email: string;
    status: PaymentStatus;
    paymentUid: string;
    orderUid: string;
    gpt: boolean;
}

const gptProduct: Product = {
    id: 9999,
    name: 'GPT-3',
    price: 0,
    description: 'GPT-3를 사용한 주문',
    quantity: 1,
    options: [],
};

const checkServerStatus = async () => {
    try {
        const response = await fetch('http://localhost:8080/checkout-status');
        if (response.ok) {
            const data = await response.json();
            if (data) {
                const response2 = await fetch('http://localhost:8080/get-remote-order');
                const gptOrder: OrderModuleDTO = await response2.json();
                console.log("원격에서 오더 내용 패치 성공")
                requestGPTPay(gptOrder);
            }
        }
    } catch (error) {
        console.error('Error checking server status:', error);
    }
}

const requestGPTPay = (orderData : OrderModuleDTO) => {
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
                buyer_addr: '테스트주소', // 구매자 주소
                buyer_postcode: '123-456', // 임의의 값
            },
            async (rsp: any) => {
                if (rsp.success) {
                    console.log('원격 결제 성공:', rsp);
                    alert('결제 완료!');
                }
                else {
                    console.error('원격 결제 실패:', rsp.error_msg);
                    alert('결제 실패: ' + rsp.error_msg);
                }
            }
        );
    } else {
        console.error('Iamport object is not found.');
    }
}

// useEffect(() => {
//     const loadIamportScript = async () => {
//         try {
//             await loadScript('https://cdn.iamport.kr/v1/iamport.js');
//             await loadScript('https://code.jquery.com/jquery-1.12.4.min.js');
//             setIsScriptLoaded(true);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     loadIamportScript();
// }, []);


const GetRemoteOrder: React.FC = () => {
    useEffect(() => {
        const loadIamportScript = async () => {
            try {
                await loadScript('https://cdn.iamport.kr/v1/iamport.js');
                await loadScript('https://code.jquery.com/jquery-1.12.4.min.js');
            } catch (error) {
                console.error(error);
            }
        };

        loadIamportScript();

        const intervalId = setInterval(() => {
            checkServerStatus();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return null;
}

export default GetRemoteOrder;