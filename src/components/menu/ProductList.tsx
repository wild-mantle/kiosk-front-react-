import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import styled from 'styled-components';

const ProductListWrapper = styled.div`
  grid-area: products;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

interface ProductListProps {
    categoryId: number | null;
    onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId, onProductClick }) => {
    const [products, setProducts] = useState<Product[]>([]);

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
                    setProducts([]);
                });
        }
    }, [categoryId]);

    return (
        <ProductListWrapper>
            {products.map(product => (
                <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
            ))}
        </ProductListWrapper>
    );
};

export default ProductList;
