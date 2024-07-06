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
    price: number;
    description: string;
    quantity: number;
}

const categoryMap = {
    coffee: '커피',
    coldbrew: '콜드브루',
    noncoffee: '논커피',
    teaade: '티·에이드',
    frappesmoothie: '프라페·블렌디드',
    food: '푸드',
    rtd: 'RTD',
    md: 'MD'
};

const categories = Object.keys(categoryMap);

const App: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>(categories[0]);
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

    const handleCategoryClick = (category: string) => {
        setCurrentCategory(category);
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

    return (
        <div className="app">
            <Header />
            <Category categories={categories} categoryMap={categoryMap} onCategoryClick={handleCategoryClick} />
            <ProductList category={currentCategory} onProductClick={handleProductClick} />
            <SelectedItems
                selectedProducts={selectedProducts}
                onClear={() => setSelectedProducts([])}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
            />
            <Timer ref={timerRef} />
            <CheckoutButton />
        </div>
    );
}

export default App;
