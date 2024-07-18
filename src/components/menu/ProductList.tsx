import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import styled from 'styled-components';

const ProductListWrapper = styled.div`
    display: grid;
    gap: 1rem;
    justify-content: center;

    @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1199px) and (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 499px) {
        grid-template-columns: 1fr;
    }
`;

const ArrowButton = styled.button<{ show: boolean }>`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: ${({ show }) => (show ? 'block' : 'none')};

    &:disabled {
        color: grey;
        cursor: not-allowed;
    }
`;

const NavigationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const ArrowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

interface ProductListProps {
    categoryId: number | null;
    onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId, onProductClick }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        if (categoryId !== null) {
            axios.get(`http://localhost:8080/api/menus/${categoryId}`)
                .then(response => {
                    const data = response.data;
                    if (Array.isArray(data)) {
                        setProducts(data.map((product: any) => ({
                            ...product,
                            imageUrl: product.image // Ensure the imageUrl field is correctly mapped
                        })));
                        setStartIndex(0); // Reset startIndex when category changes
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

    const handlePrevClick = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (startIndex + 8 < products.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const visibleProducts = products.slice(startIndex, startIndex + 8);

    return (
        <NavigationWrapper>
            <ArrowButton onClick={handlePrevClick} disabled={startIndex === 0} show={products.length > 8}>
                {"<"}
            </ArrowButton>
            <ProductListWrapper>
                {visibleProducts.map(product => (
                    <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
                ))}
            </ProductListWrapper>
            <ArrowButton onClick={handleNextClick} disabled={startIndex + 8 >= products.length} show={products.length > 8}>
                {">"}
            </ArrowButton>
        </NavigationWrapper>
    );
};

export default ProductList;
