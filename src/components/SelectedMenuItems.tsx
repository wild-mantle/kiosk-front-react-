import React from 'react';

interface Menu {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    image: string;
    category: string;
}

interface SelectedMenuItemsProps {
    selectedMenuItems: Menu[];
    onClear: () => void;
}

const SelectedMenuItems: React.FC<SelectedMenuItemsProps> = ({ selectedMenuItems, onClear }) => {
    return (
        <div className="selected-items">
            <h2>Selected Menus</h2>
            <ul>
                {selectedMenuItems.map((menu, index) => (
                    <li key={index}>{menu.name} - {menu.basePrice}원</li>
                ))}
            </ul>
            <button onClick={onClear}>전체삭제</button>
        </div>
    );
}

export default SelectedMenuItems;
