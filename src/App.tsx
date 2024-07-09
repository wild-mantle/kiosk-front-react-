import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Category from './components/Category';
import ProductList from './components/ProductList';
import SelectedItems from './components/SelectedItems';
import Timer from './components/Timer';
import CheckoutButton from './components/CheckoutButton';
import CustomOptionModal from './components/CustomOptionModal';
import PaymentModal from './components/PaymentModel'
import { Product, CustomOption, OrderModuleDTO, PaymentStatus } from './types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface CategoryMap {
    id: number;
    name: string;
}

const categories: CategoryMap[] = [
    { id: 1, name: '커피' },
    { id: 2, name: '콜드브루' },
    { id: 3, name: '논커피' },
    { id: 4, name: '티·에이드' },
    { id: 5, name: '프라페·블렌디드' },
    { id: 6, name: '푸드' },
    { id: 7, name: 'RTD' },
    { id: 8, name: 'MD' }
];

const App: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [currentCategory, setCurrentCategory] = useState<number>(categories[0].id);
    const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
    const [currentSelectedProduct, setCurrentSelectedProduct] = useState<Product | null>(null);
    const timerRef = useRef<{ resetTimer: () => void }>(null);

    const handleProductClick = (product: Product) => {
        setCurrentSelectedProduct({ ...product, quantity: 1, options: [] });
        setIsModalOpen(true);
    };

    const handleProductOptionClick = (menuId: number) => {
        setCurrentMenuId(menuId);
    };

    const handleCategoryClick = (categoryId: number) => {
        setCurrentCategory(categoryId);
        if (timerRef.current) {
            timerRef.current.resetTimer();
        }
    };

    const handleIncreaseQuantity = (productId: number) => {
        setSelectedProducts(selectedProducts.map(p =>
            p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        ));
        if (timerRef.current) {
            timerRef.current.resetTimer();
        }
    };

    const handleDecreaseQuantity = (productId: number) => {
        const product = selectedProducts.find(p => p.id === productId);
        if (product && product.quantity > 1) {
            setSelectedProducts(selectedProducts.map(p =>
                p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
            ));
        } else {
            setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
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
        console.log('Checkout data:', orderData);
        setIsPaymentModalOpen(true);
    };

    const handlePaymentModalClose = () => {
        setIsPaymentModalOpen(false);
    };

    const totalPrice = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="app">
            <Header />
            <Category categories={categories} onCategoryClick={handleCategoryClick} />
            <ProductList
                categoryId={currentCategory}
                onProductClick={handleProductClick}
                onProductOptionClick={handleProductOptionClick}
            />
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
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
            />
            <Timer ref={timerRef} />
            <CheckoutButton
                selectedProducts={selectedProducts}
                totalPrice={totalPrice}
                onCheckoutClick={handleCheckoutClick}
            />
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onRequestClose={handlePaymentModalClose}
                orderData={{
                    id: 1,
                    price: totalPrice,
                    storeName: '1달러샵',
                    email: 'customer@example.com',
                    address: '서울시 강남구',
                    status: PaymentStatus.PENDING,
                    paymentUid: '',
                    orderUid: `order_${new Date().getTime()}`,
                }}
            />
        </div>
    );
};

export default App;
