import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Category from './components/Category';
import Timer from './components/Timer';
import CheckoutButton from './components/CheckoutButton';
import SelectedMenuItems from "./components/SelectedMenuItems";
import MenuList from "./components/MenuList";
import Modal from './components/Modal';


export interface Menu {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    image: string;
    category: string;
}

export interface CustomOptions {
    temperature: string;
    size: string;
    shot: boolean;
    whippedCream: boolean;
    packaging: string;
}


const App: React.FC = () => {
    const [selectedMenuItems, setSelectedMenuItems] = useState<Menu[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeMenu, setActiveMenu] = useState<Menu | null>(null);
    const [customOptions, setCustomOptions] = useState<CustomOptions | null>(null);
    const timerRef = useRef<{ resetTimer: () => void }>(null);

    const handleMenuItemsClick = (menuItem: Menu) => {
        setActiveMenu(menuItem);
        setIsModalOpen(true);
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setActiveMenu(null);
    };

    const handleSaveOptions = (options: CustomOptions) => {
        setCustomOptions(options);
        // 여기서 필요한 로직을 추가하세요. 예를 들어, 주문에 추가하거나 서버에 저장.
    };

    const handleAddToOrder = (menuItem: Menu) => {
        setSelectedMenuItems([...selectedMenuItems, menuItem]);
        handleCloseModal();
    };

    return (
        <div className="app">
            <Header />
            <Category onCategoryClick={handleCategoryClick} />
            {currentCategory && <MenuList category={currentCategory} onMenuItemClick={handleMenuItemsClick} />}
            <SelectedMenuItems selectedMenuItems={selectedMenuItems} onClear={() => setSelectedMenuItems([])} />
            <Timer ref={timerRef} />
            <CheckoutButton />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveOptions}
                menu={activeMenu}
            />
        </div>
    );
}

export default App;
