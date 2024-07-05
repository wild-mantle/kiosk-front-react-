import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import ProductList from './components/ProductList';
import Timer from './components/Timer';
import CheckoutButton from './components/CheckoutButton';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <Menu />
            <ProductList />
            <Timer />
            <CheckoutButton />
        </div>
    );
}

export default App;
