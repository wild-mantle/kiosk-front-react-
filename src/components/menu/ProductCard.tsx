import React from 'react';
import { Product } from '../../types';
import styled from 'styled-components';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const ProductCardWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.productBorderColor};
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
  width: 150px;
  cursor: pointer;
  color: ${({ theme }) => theme.productTextColor};
`;

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <ProductCardWrapper onClick={onClick}>
            <h2>{product.name}</h2>
            <p>{product.price}원</p>
            <p>{product.description}</p>
        </ProductCardWrapper>
    );
}

export default ProductCard;
