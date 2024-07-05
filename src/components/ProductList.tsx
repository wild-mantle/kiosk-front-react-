import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
