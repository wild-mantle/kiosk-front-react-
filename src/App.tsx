import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import ProductCard from './components/ProductCard';
import SelectedItems from './components/SelectedItems';
import Timer from './components/Timer';
import CheckoutButton from './components/CheckoutButton';

const products = [
    { name: "골드망고 스무디", price: 4000, image: "logo192.png" },
    { name: "코코넛 커피 스무디", price: 4000, image: "/images/coconut_coffee_smoothie.png" },
    { name: "망고 코코넛 주스", price: 3800, image: "/images/mango_coconut_juice.png" },
    { name: "망고 허니블랙 티소다", price: 5800, image: "/images/mango_honeyblack_soda.png" },
    { name: "딸기 쿠키 프라페", price: 4900, image: "/images/strawberry_cookie_frappe.png" },
    { name: "흑당 버블 라떼", price: 4800, image: "/images/bubble_milk_tea.png" },
    { name: "흑당 라떼", price: 5000, image: "/images/brown_sugar_latte.png" },
];

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <Menu />
            <div className="product-list">
                {products.map(product => (
                    <ProductCard
                        key={product.name}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
            <SelectedItems />
            <Timer />
            <CheckoutButton />
        </div>
    );
}

export default App;
