import React from 'react';

interface Menu {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    image: string;
    category: string;
}

interface MenuCardProps {
    menu: Menu;
    onClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onClick }) => {
    return (
        <div className="menu-card" onClick={onClick}>
            <h2>{menu.name}</h2>
            <p>{menu.description}</p>
            <p>{menu.basePrice}</p>
        </div>
    );
}

export default MenuCard;
