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
}

const categoryMap = {
    seasonal: '시즌 메뉴',
    hotcoffee: '커피(HOT)',
    coolcoffee: '커피(ICE)'
};

const categories = Object.keys(categoryMap);

const App: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>(categories[0]);
    const timerRef = useRef<{ resetTimer: () => void }>(null);

    const handleProductClick = (product: Product) => {
        setSelectedProducts([...selectedProducts, product]);
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

    return (
        <div className="app">
            <Header />
            <Category categories={categories} categoryMap={categoryMap} onCategoryClick={handleCategoryClick} />
            <ProductList category={currentCategory} onProductClick={handleProductClick} />
            <SelectedItems selectedProducts={selectedProducts} onClear={() => setSelectedProducts([])} />
            <Timer ref={timerRef} />
            <CheckoutButton />
        </div>
    );
}

export default App;
