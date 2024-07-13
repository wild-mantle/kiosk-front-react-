import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Category from './Category';
import ProductList from './ProductList';
import SelectedItems from './SelectedItems';
import Timer from './Timer';
import CheckoutButton from './CheckoutButton';
import CustomOptionModal from './CustomOptionModal';
import { Product, CustomOption, OrderModuleDTO } from '../types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const categories = [
    { id: 1, name: '커피' },
    { id: 2, name: '콜드브루' },
    { id: 3, name: '논커피' },
    { id: 4, name: '티·에이드' },
    { id: 5, name: '프라페·블렌디드' },
    { id: 6, name: '푸드' },
    { id: 7, name: 'RTD' },
    { id: 8, name: 'MD' }
];

const Home: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [currentCategory, setCurrentCategory] = useState<number>(categories[0].id);
    const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentSelectedProduct, setCurrentSelectedProduct] = useState<Product | null>(null);
    const [orderData, setOrderData] = useState<OrderModuleDTO | null>(null);
    const timerRef = useRef<{ resetTimer: () => void }>(null);
    const navigate = useNavigate();

    const handleProductClick = (product: Product) => {
        setCurrentSelectedProduct({ ...product, quantity: 1, options: [] });
        setCurrentMenuId(product.id); // 현재 메뉴 ID 설정
        setIsModalOpen(true);
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
        setOrderData(orderData);
        navigate('/payment', { state: { orderData, selectedProducts } });
    };

    const totalPrice = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="app">
            <Header />
            <div>
                <h3>현재 키오스크: {authContext?.kioskInfo?.number}</h3>
            </div>
            <Category categories={categories} onCategoryClick={handleCategoryClick} />
            <ProductList
                categoryId={currentCategory}
                onProductClick={handleProductClick}
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
        </div>
    );
};

export default Home;
