import React, { useState, useEffect, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { OrderModuleDTO, Product } from '../types';
import { loadScript } from './LoadScript';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './PaymentPage.css';
import PointModal from './PointModal';
import PasswordModal from './PasswordModal';

interface LocationState {
    orderData: OrderModuleDTO;
    selectedProducts: Product[];
}

const PaymentPage: React.FC = () => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isPackaged, setIsPackaged] = useState<boolean | undefined>(undefined);
    const [highlightButtons, setHighlightButtons] = useState(false);
    const [isPointModalOpen, setIsPointModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [storedPhoneNumber, setStoredPhoneNumber] = useState(''); // 전화번호 저장 변수 추가
    const [password, setPassword] = useState('');
    const [existingCustomer, setExistingCustomer] = useState(false);
    const [isValid, setIsValid] = useState(false); // 비밀번호 유효성 상태 추가
    const [points, setPoints] = useState(0); // 포인트 상태 추가
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const { orderData, selectedProducts } = state;
    const authContext = useContext(AuthContext);

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
    }, []);

    const handlePackagedClick = (isPackaged: boolean) => {
        setIsPackaged(isPackaged);
    };

    const requestPay = () => {
        if (isPackaged === undefined) {
            setHighlightButtons(true);
            setTimeout(() => setHighlightButtons(false), 10000);
            return;
        }

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
                        console.log('결제 성공:', rsp);
                        try {
                            // 결제 성공 시 주문 생성
                            const order = {
                                customer: {
                                    customerID: 1, // 실제 고객 ID 사용
                                    customerName: 'Test Customer',
                                    customerPhone: '010-1234-5678',
                                    points: 100,
                                    email: orderData.email,
                                    address: orderData.address
                                },
                                kiosk: {
                                    id: 1, // 여기도 값을 받아와야함
                                    number: 'kiosk1',
                                    store: { storeID: authContext?.storeInfo?.id } // Store 객체를 적절히 설정해야 함
                                },
                                dateTime: new Date(),
                                totalPrice: orderData.price,
                                isPackaged: isPackaged // 포장 여부 설정
                            };

                            const response = await axios.post('http://localhost:8080/api/orders', order);
                            console.log('서버 응답:', response.data);
                            alert('결제 완료!');
                            navigate('/home'); // 결제 완료 후 홈으로 이동
                        } catch (error) {
                            console.error('주문 생성 실패:', error);
                            alert('주문 생성 실패!');
                        }
                    } else {
                        console.error('결제 실패:', rsp.error_msg);
                        alert('결제 실패: ' + rsp.error_msg);
                    }
                }
            );
        } else {
            console.error('Iamport object is not found.');
        }
    };

    const handlePointModalOpen = () => {
        setIsPointModalOpen(true);
    };

    const handlePointModalClose = () => {
        setIsPointModalOpen(false);
        setSearchInput(''); // 모달이 닫힐 때 입력 필드 초기화
    };

    const handlePasswordModalOpen = () => {
        setIsPasswordModalOpen(true);
    };

    const handlePasswordModalClose = () => {
        setIsPasswordModalOpen(false);
        setPassword(''); // 모달이 닫힐 때 비밀번호 필드 초기화
        setIsValid(false); // 모달이 닫힐 때 유효성 상태 초기화
        setStoredPhoneNumber(''); // 모달이 닫힐 때 저장된 전화번호 초기화
        setExistingCustomer(false); // 모달이 닫힐 때 기존 고객 여부 초기화
    };

    const handleSearch = async () => {
        console.log(searchInput); // 입력된 전화번호를 콘솔에 출력
        setStoredPhoneNumber(searchInput); // 검색한 전화번호를 저장
        try {
            const response = await axios.get(`http://localhost:8080/api/customer/${searchInput}`);
            if (response.status === 200) {
                // 전화번호가 이미 존재하면 비밀번호 입력 모달 열기
                setExistingCustomer(true);
                handlePointModalClose();
                handlePasswordModalOpen();
            } else if (response.status === 404) {
                // 전화번호가 존재하지 않으면 비밀번호 설정 모달 열기
                setExistingCustomer(false);
                handlePointModalClose();
                handlePasswordModalOpen();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 404) {
                    // 전화번호가 존재하지 않으면 비밀번호 설정 모달 열기
                    setExistingCustomer(false);
                    handlePointModalClose();
                    handlePasswordModalOpen();
                } else {
                    console.error(error);
                }
            } else {
                console.error(error);
            }
        }
    };

    const handlePasswordSubmit = async () => {
        console.log(storedPhoneNumber); // 저장된 전화번호를 콘솔에 출력
        if (existingCustomer) {
            try {
                const response = await axios.post('http://localhost:8080/api/customer/validatePassword', {
                    phoneNumber: storedPhoneNumber,
                    password: password
                });
                if (response.data.valid) {
                    setIsValid(true);
                    setPoints(response.data.points);
                } else {
                    alert('비밀번호가 유효하지 않습니다.');
                }
            } catch (error) {
                console.error(error);
                alert('포인트 확인에 실패했습니다.');
            }
        } else {
            // 새 고객 등록 및 비밀번호 설정 로직
            try {
                const response = await axios.post('http://localhost:8080/api/customer/register', {
                    phoneNumber: storedPhoneNumber,
                    password: password
                });
                console.log('Response data:', response.data); // 디버깅
                alert('고객이 등록되었습니다!');
                handlePasswordModalClose();
            } catch (error) {
                console.error(error);
                alert('고객 등록에 실패했습니다.');
            } finally {
                handlePasswordModalClose();
            }
        }
    };

    const handleUsePoints = () => {
        // 포인트 사용 로직 추가
        console.log('포인트 사용');
    };

    const handleSkipPoints = () => {
        // 포인트 사용하지 않음 로직 추가
        console.log('포인트 사용 안함');
    };

    const handleTestButtonClick = () => {
        console.log('현재 주문 데이터:', orderData);
        const order = {
            customer: {
                customerID: 1, // 실제 고객 ID 사용
                customerName: 'Test Customer',
                customerPhone: '010-1234-5678',
                points: 100,
                email: orderData.email,
                address: orderData.address
            },
            kiosk: {
                id: 1, // 실제 키오스크 ID 사용
                number: 'Kiosk-01',
                store: { storeID: authContext?.storeInfo?.id } // Store 객체를 적절히 설정해야 함
            },
            dateTime: new Date(),
            totalPrice: orderData.price,
            isPackaged: isPackaged // 포장 여부 설정
        };
        console.log('생성될 주문 객체:', order);
    };

    const handleInputChange = (input: string) => {
        setSearchInput(input);
    };

    return (
        <div className="payment-page">
            <header className="payment-header">주문목록</header>
            <div className="payment-content">
                <div className="order-list">
                    {selectedProducts.map(product => (
                        <div key={product.id} className="product-item">
                            <h3>{product.name}</h3>
                            <p>가격: {product.price}원</p>
                            <p>수량: {product.quantity}</p>
                            {product.options.map(option => (
                                <p key={option.id}>옵션: {option.name} (+{option.additionalPrice}원)</p>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="payment-options">
                    <button
                        className={`payment-button ${isPackaged === false ? 'selected' : ''} ${highlightButtons && isPackaged === undefined ? 'highlight' : ''}`}
                        onClick={() => handlePackagedClick(false)}
                    >
                        먹고가기
                    </button>
                    <button
                        className={`payment-button ${isPackaged === true ? 'selected' : ''} ${highlightButtons && isPackaged === undefined ? 'highlight' : ''}`}
                        onClick={() => handlePackagedClick(true)}
                    >
                        포장하기
                    </button>
                    <button className="payment-button" onClick={handlePointModalOpen}>
                        포인트 적립 및 사용
                    </button>
                    <button className="payment-button" onClick={handleTestButtonClick}>
                        테스트
                    </button>
                </div>
            </div>
            <footer className="payment-footer">
                <div className="total-amount">결제 금액: {orderData.price}원</div>
                <button className="payment-button" onClick={requestPay} disabled={!isScriptLoaded}>
                    결제하기
                </button>
            </footer>
            <PointModal
                isOpen={isPointModalOpen}
                onRequestClose={handlePointModalClose}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleSearch={handleSearch}
                handleInputChange={handleInputChange}
            />
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onRequestClose={handlePasswordModalClose}
                password={password}
                setPassword={setPassword}
                handlePasswordSubmit={handlePasswordSubmit}
                isValid={isValid}
                points={points}
                handleUsePoints={handleUsePoints}
                handleSkipPoints={handleSkipPoints}
            />
        </div>
    );
};

export default PaymentPage;
