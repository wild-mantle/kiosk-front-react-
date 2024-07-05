import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const handleProductClick = (product: Product) => {
        setSelectedProducts([...selectedProducts, product]);
    };

    return (
        <div>
            <h1>Product List</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                    />
                ))}
            </div>
            <div className="selected-items">
                <h2>Selected Products</h2>
                <ul>
                    {selectedProducts.map((product, index) => (
                        <li key={index}>{product.name} - {product.price}원</li>
                    ))}
                </ul>
                <button onClick={() => setSelectedProducts([])}>전체삭제</button>
            </div>
        </div>
    );
}

export default ProductList;
