import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProductCard from './components/ProductCard';
import ProductList from "./components/ProductList";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
            </Routes>
        </Router>
    );
}

export default App;
