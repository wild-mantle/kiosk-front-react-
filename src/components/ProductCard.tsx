import React from 'react';

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{price}원</p>
        </div>
    );
}

export default ProductCard;
