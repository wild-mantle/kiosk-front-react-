import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

interface Product {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    quantity: number;
}

interface ProductListProps {
    categoryId: number;
    onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId, onProductClick }) => {
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
                    onClick={() => onProductClick(product)}
                />
            ))}
        </div>
    );
}

export default ProductList;
