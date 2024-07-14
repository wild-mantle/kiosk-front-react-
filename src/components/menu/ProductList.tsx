import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductListProps {
    categoryId: number | null;
    onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId, onProductClick }) => {
    const [products, setProducts] = useState<Product[]>([]); // Initialize as an empty array

    useEffect(() => {
        if (categoryId !== null) {
            axios.get(`http://localhost:8080/api/menus/${categoryId}`)
                .then(response => {
                    const data = response.data;
                    if (Array.isArray(data)) {
                        setProducts(data);
                    } else {
                        console.error('API response is not an array', data);
                        setProducts([]);
                    }
                })
                .catch(error => {
                    console.error('There was an error fetching the products!', error);
                    setProducts([]); // Set to an empty array on error
                });
        }
    }, [categoryId]);

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
            ))}
        </div>
    );
};

export default ProductList;
