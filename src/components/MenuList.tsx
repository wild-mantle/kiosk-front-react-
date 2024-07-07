import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';

interface Menu {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    image: string;
    category: string;
}

interface MenuListProps {
    category: string;
    onMenuItemClick: (menu: Menu) => void;
}

const MenuList: React.FC<MenuListProps> = ({ category, onMenuItemClick }) => {
    const [menus, setMenus] = useState<Menu[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/menus/${category}`);
                setMenus(response.data);
            } catch (error) {
                console.error('There was an error fetching the menus!', error);
            }
        };

        fetchData();
    }, [category]);

    return (
        <div className="menu-list">
            {menus.map(menu => (
                <MenuCard
                    key={menu.id}
                    menu={menu}
                    onClick={() => onMenuItemClick(menu)}
                />
            ))}
        </div>
    );
}

export default MenuList;
