import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Category from './Category';
import ProductList from './ProductList';
import SelectedItems from './SelectedItems';
import Timer from './Timer';
import CheckoutButton from './CheckoutButton';
import CustomOptionModal from './CustomOptionModal';
import PaymentModal from './PaymentModel';
import axios from '../api/axiosConfig';
import { Product, CustomOption, OrderModuleDTO, Category as CategoryType } from '../types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Home: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [currentCategory, setCurrentCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
    const [currentSelectedProduct, setCurrentSelectedProduct] = useState<Product | null>(null);
    const [orderData, setOrderData] = useState<OrderModuleDTO | null>(null);
    const timerRef = useRef<{ resetTimer: () => void }>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/menus/categories')
            .then(response => {
                setCategories(response.data);
                if (response.data.length > 0) {
                    setCurrentCategory(response.data[0].id);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });
    }, []);

    const handleProductClick = (product: Product) => {
        axios.get(`http://localhost:8080/api/menus/select-custom-option/${product.id}`)
            .then(response => {
                const options = response.data;
                if (options.length > 0) {
                    setCurrentSelectedProduct({ ...product, quantity: 1, options: [] });
                    setCurrentMenuId(product.id);
                    setIsModalOpen(true);
                } else {
                    // Add product directly if no options are available
                    setSelectedProducts([...selectedProducts, { ...product, quantity: 1, options: [] }]);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the custom options!', error);
            });
    };

    const handleCategoryClick = (categoryId: number) => {
        setCurrentCategory(categoryId);
        if (timerRef.current) {
            timerRef.current.resetTimer();
        }
    };

    const handleIncreaseQuantity = (productId: number, options: CustomOption[]) => {
        setSelectedProducts(selectedProducts.map(p =>
            p.id === productId && areOptionsEqual(p.options, options)
                ? { ...p, quantity: p.quantity + 1 }
                : p
        ));
        if (timerRef.current) {
            timerRef.current.resetTimer();
        }
    };

    const handleDecreaseQuantity = (productId: number, options: CustomOption[]) => {
        const product = selectedProducts.find(p => p.id === productId && areOptionsEqual(p.options, options));
        if (product && product.quantity > 1) {
            setSelectedProducts(selectedProducts.map(p =>
                p.id === productId && areOptionsEqual(p.options, options)
                    ? { ...p, quantity: p.quantity - 1 }
                    : p
            ));
        } else {
            setSelectedProducts(selectedProducts.filter(p => !(p.id === productId && areOptionsEqual(p.options, options))));
        }
        if (timerRef.current) {
            timerRef.current.resetTimer();
        }
    };

    const handleAddOption = (option: CustomOption) => {
        if (currentSelectedProduct) {
            const updatedProduct = {
                ...currentSelectedProduct,
                price: currentSelectedProduct.price + option.additionalPrice,
                options: [...currentSelectedProduct.options, option]
            };
            setCurrentSelectedProduct(updatedProduct);
        }
    };

    const handleRemoveOption = (option: CustomOption) => {
        if (currentSelectedProduct) {
            const updatedProduct = {
                ...currentSelectedProduct,
                price: currentSelectedProduct.price - option.additionalPrice,
                options: currentSelectedProduct.options.filter(opt => opt.id !== option.id)
            };
            setCurrentSelectedProduct(updatedProduct);
        }
    };

    const areOptionsEqual = (options1: CustomOption[], options2: CustomOption[]) => {
        if (options1.length !== options2.length) return false;
        const sortedOptions1 = options1.map(opt => opt.id).sort();
        const sortedOptions2 = options2.map(opt => opt.id).sort();
        return sortedOptions1.every((value, index) => value === sortedOptions2[index]);
    };

    const handleModalClose = () => {
        if (currentSelectedProduct) {
            const existingProduct = selectedProducts.find(p =>
                p.id === currentSelectedProduct.id && areOptionsEqual(p.options, currentSelectedProduct.options)
            );
            if (existingProduct) {
                setSelectedProducts(selectedProducts.map(p =>
                    p.id === currentSelectedProduct.id && areOptionsEqual(p.options, currentSelectedProduct.options)
                        ? { ...p, quantity: p.quantity + currentSelectedProduct.quantity }
                        : p
                ));
            } else {
                setSelectedProducts([...selectedProducts, currentSelectedProduct]);
            }
        }
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const handleCheckoutClick = (orderData: OrderModuleDTO) => {
        setOrderData(orderData);  // orderData 상태 설정
        setIsPaymentModalOpen(true);  // 결제 모달을 열기 위해 상태를 true로 설정
    };

    const handlePaymentModalClose = () => {
        setIsPaymentModalOpen(false);
        setOrderData(null);  // orderData 초기화
    };

    const totalPrice = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="home">
            <Header />
            <Category categories={categories} onCategoryClick={handleCategoryClick} />
            {currentCategory && (
                <ProductList
                    categoryId={currentCategory}
                    onProductClick={handleProductClick}
                />
            )}
            {currentMenuId && currentSelectedProduct && (
                <CustomOptionModal
                    isOpen={isModalOpen}
                    onRequestClose={handleModalClose}
                    onRequestCancel={handleModalCancel}
                    menuId={currentMenuId}
                    selectedProduct={currentSelectedProduct}
                    onAddOption={handleAddOption}
                    onRemoveOption={handleRemoveOption}
                />
            )}
            <SelectedItems
                selectedProducts={selectedProducts}
                onClear={() => setSelectedProducts([])}
                onIncreaseQuantity={(productId, options) => handleIncreaseQuantity(productId, options)}
                onDecreaseQuantity={(productId, options) => handleDecreaseQuantity(productId, options)}
            />
            <Timer ref={timerRef} />
            <CheckoutButton
                selectedProducts={selectedProducts}
                totalPrice={totalPrice}
                onCheckoutClick={handleCheckoutClick}
            />
            {orderData && (
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onRequestClose={handlePaymentModalClose}
                    orderData={orderData}  // orderData 상태를 PaymentModal에 전달
                />
            )}
        </div>
    );
};

export default Home;
