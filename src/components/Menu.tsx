import React from 'react';

const Menu: React.FC = () => {
    return (
        <nav className="menu">
            <button className="menu-button">시즌 메뉴</button>
            <button className="menu-button">커피(HOT)</button>
            <button className="menu-button">커피(ICE)</button>
        </nav>
    );
}

export default Menu;
