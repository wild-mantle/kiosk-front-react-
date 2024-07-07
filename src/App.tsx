import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Category from './components/Category';
import Timer from './components/Timer';
import CheckoutButton from './components/CheckoutButton';
import SelectedMenuItems from "./components/SelectedMenuItems";
import MenuList from "./components/MenuList";

interface Menu {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    image: string;
    category: string;
}

const App: React.FC = () => {
    const [selectedMenuItems, setSelectedMenuItems] = useState<Menu[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>('');
    const timerRef = useRef<{ resetTimer: () => void }>(null);

    const handleMenuItemsClick = (menuItem: Menu) => {
        setSelectedMenuItems([...selectedMenuItems, menuItem]);
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
            <Category onCategoryClick={handleCategoryClick} />
            {currentCategory && <MenuList category={currentCategory} onMenuItemClick={handleMenuItemsClick} />}
            <SelectedMenuItems selectedMenuItems={selectedMenuItems} onClear={() => setSelectedMenuItems([])} />
            <Timer ref={timerRef} />
            <CheckoutButton />
        </div>
    );
}

export default App;
