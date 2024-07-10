import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Product } from '../types';

interface ProductListProps {
    categoryId: number;
    onProductClick: (product: Product) => void;
    onProductOptionClick: (menuId: number) => void;
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
        <div>
            {/* 제품 리스트 렌더링 로직 */}
        </div>
    );
};

export default ProductList;
