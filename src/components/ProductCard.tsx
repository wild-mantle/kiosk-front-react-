import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <div className="product-card" onClick={onClick}>
            <h2>{product.name}</h2>
            <p>{product.price}원</p>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductCard;
