import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Category from './components/Category';
import ProductList from './components/ProductList';
import SelectedItems from './components/SelectedItems';
import Timer from './components/Timer';
import CheckoutButton from './components/CheckoutButton';

interface Product {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    quantity: number;
}

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
    const timerRef = useRef<{ resetTimer: () => void }>(null);

    const handleProductClick = (product: Product) => {
        const existingProduct = selectedProducts.find(p => p.id === product.id);
        if (existingProduct) {
            setSelectedProducts(selectedProducts.map(p =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ));
        } else {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        }
        if (timerRef.current) {
            timerRef.current.resetTimer();
        }
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

    const totalPrice = selectedProducts.reduce((total, product) => total + product.basePrice * product.quantity, 0);

    return (
        <div className="app">
            <Header />
            <Category categories={categories} onCategoryClick={handleCategoryClick} />
            <ProductList categoryId={currentCategory} onProductClick={handleProductClick} />
            <SelectedItems
                selectedProducts={selectedProducts}
                onClear={() => setSelectedProducts([])}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
            />
            <Timer ref={timerRef} />
            <CheckoutButton selectedProducts={selectedProducts} totalPrice={totalPrice} />
        </div>
    );
}

export default App;
