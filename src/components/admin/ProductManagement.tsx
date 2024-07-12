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

interface Category {
    id: number;
    name: string;
}

interface Option {
    id: number;
    name: string;
}

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', price: 0, category: '', options: [], soldOut: false, tags: '' });
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const apiHost = "http://localhost:8080";

    useEffect(() => {
        axios.get(`${apiHost}/api/menus/all`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
        axios.get(`${apiHost}/admin/category/all`)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
        axios.get(`${apiHost}/api/menus/all-custom-options`)
            .then(response => setOptions(response.data))
            .catch(error => console.error('Error fetching options:', error));
    }, []);

    const handleAddProduct = () => {
        axios.post(`${apiHost}/admin/menu/add_rest`, newProduct)
            .then(response => {
                setProducts([...products, response.data]);
                setShowAddModal(false);
                setNewProduct({ id: 0, name: '', price: 0, category: '', options: [], soldOut: false, tags: '' });
            })
            .catch(error => console.error('Error adding product:', error));
    };

    const handleEditProduct = (id: number) => {
        axios.put(`${apiHost}/api/menus/${id}`, newProduct)
            .then(response => setProducts(products.map(product => product.id === id ? response.data : product)))
            .catch(error => console.error('Error editing product:', error));
    };

    const handleDeleteProduct = (id: number) => {
        axios.delete(`${apiHost}/api/menus/${id}`)
            .then(() => setProducts(products.filter(product => product.id !== id)))
            .catch(error => console.error('Error deleting product:', error));
    };

    const openEditModal = (product: Product) => {
        setEditingProductId(product.id);
        setNewProduct(product);
        setShowEditModal(true);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <div>
            <h2>상품 관리</h2>
            <div>
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        style={{ fontWeight: selectedCategory === category.name ? 'bold' : 'normal' }}
                    >
                        {category.name}
                    </button>
                ))}
                <button
                    onClick={() => setSelectedCategory(null)}
                    style={{ fontWeight: selectedCategory === null ? 'bold' : 'normal' }}
                >
                    전체
                </button>
            </div>
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
                    <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                        <option value="">카테고리 선택</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <div>
                        <h4>옵션 선택</h4>
                        {options.map(option => (
                            <label key={option.id}>
                                <input
                                    type="checkbox"
                                    checked={newProduct.options.includes(option.name)}
                                    onChange={(e) => {
                                        const newOptions = e.target.checked
                                            ? [...newProduct.options, option.name]
                                            : newProduct.options.filter(opt => opt !== option.name);
                                        setNewProduct({ ...newProduct, options: newOptions });
                                    }}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                    <label>
                        품절 여부
                        <input
                            type="checkbox"
                            checked={newProduct.soldOut}
                            onChange={(e) => setNewProduct({ ...newProduct, soldOut: e.target.checked })}
                        />
                    </label>
                    <select
                        value={newProduct.tags}
                        onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                    >
                        <option value="">태그 선택</option>
                        <option value="인기">인기</option>
                        <option value="신규">신규</option>
                    </select>
                    <button onClick={handleAddProduct}>저장</button>
                    <button onClick={() => setShowAddModal(false)}>취소</button>
                </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <h3>상품 수정</h3>
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
                    <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                        <option value="">카테고리 선택</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <div>
                        <h4>옵션 선택</h4>
                        {options.map(option => (
                            <label key={option.id}>
                                <input
                                    type="checkbox"
                                    checked={newProduct.options.includes(option.name)}
                                    onChange={(e) => {
                                        const newOptions = e.target.checked
                                            ? [...newProduct.options, option.name]
                                            : newProduct.options.filter(opt => opt !== option.name);
                                        setNewProduct({ ...newProduct, options: newOptions });
                                    }}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                    <label>
                        품절 여부
                        <input
                            type="checkbox"
                            checked={newProduct.soldOut}
                            onChange={(e) => setNewProduct({ ...newProduct, soldOut: e.target.checked })}
                        />
                    </label>
                    <select
                        value={newProduct.tags}
                        onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                    >
                        <option value="">태그 선택</option>
                        <option value="인기">인기</option>
                        <option value="신규">신규</option>
                    </select>
                    <button onClick={() => {
                        if (editingProductId !== null) handleEditProduct(editingProductId);
                        setShowEditModal(false);
                        setEditingProductId(null);
                    }}>저장</button>
                    <button onClick={() => setShowEditModal(false)}>취소</button>
                </div>
            )}
            <ul>
                {filteredProducts.map(product => (
                    <li key={product.id}>
                        <span>{product.name}</span>
                        <button onClick={() => openEditModal(product)}>수정</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
