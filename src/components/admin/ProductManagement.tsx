import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    options: string[];
    soldOut: boolean;
    tags: string;
}

/**
 * ProductManagement 컴포넌트
 * - 상품 추가 및 편집 기능을 포함
 */
const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: '', options: [], soldOut: false, tags: '' });

    // 서버에서 상품 목록 가져오기
    useEffect(() => {
        axios.get('/api/menus/all')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);


    // 상품 추가
    const handleAddProduct = () => {
        axios.post('/api/products', newProduct)
            .then(response => {
                setProducts([...products, response.data]);
                setShowAddModal(false);
                setNewProduct({ name: '', price: 0, category: '', options: [], soldOut: false, tags: '' });
            })
            .catch(error => console.error('Error adding product:', error));
    };

    // 상품 삭제
    const handleDeleteProduct = (id: number) => {
        axios.delete(`/api/products/${id}`)
            .then(() => setProducts(products.filter(product => product.id !== id)))
            .catch(error => console.error('Error deleting product:', error));
    };

    // 상품 수정
    const handleEditProduct = (id: number) => {
        axios.put(`/api/products/${id}`, newProduct)
            .then(response => setProducts(products.map(product => product.id === id ? response.data : product)))
            .catch(error => console.error('Error editing product:', error));
    };

    return (
        <div>
            <h2>상품 관리</h2>
            <button onClick={() => setShowAddModal(true)}>+ 상품 추가</button>
            {showAddModal && (
                <div className="modal">
                    <h3>상품 추가</h3>
                    <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="상품 이름"
                    />
                    <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        placeholder="상품 가격"
                    />
                    {/* 여기에서 카테고리 선택, 옵션 선택, 품절 표시, 태그 설정 폼 구현 */}
                    <button onClick={handleAddProduct}>저장</button>
                    <button onClick={() => setShowAddModal(false)}>취소</button>
                </div>
            )}
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <span>{product.name}</span>
                        <button onClick={() => handleEditProduct(product.id)}>수정</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
