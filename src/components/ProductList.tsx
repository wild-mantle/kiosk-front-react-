import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Product, CustomOption } from '../types';

interface ProductListProps {
    categoryId: number;
    onProductClick: (product: Product) => void;
    onProductOptionClick: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId, onProductClick, onProductOptionClick }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/menus/${categoryId}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, [categoryId]);

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => {
                        onProductClick(product);
                        onProductOptionClick(product.id);
                    }}
                />
            ))}
        </div>
    );
}

export default ProductList;
