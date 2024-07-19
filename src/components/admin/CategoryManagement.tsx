import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Category {
    id: number;
    name: string;
    visible: boolean;
}

const API_URL = process.env.REACT_APP_API_URL;

const CategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const apiHost = `${API_URL}`;

    useEffect(() => {
        axios.get(`${apiHost}/admin/category/all`)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleAddCategory = () => {
        axios.post(`${apiHost}/admin/category/add`, null, { params: { name: newCategoryName } })
            .then(response => {
                setCategories([...categories, { id: response.data.id, name: newCategoryName, visible: true }]);
                setShowAddModal(false);
                setNewCategoryName('');
            })
            .catch(error => console.error('Error adding category:', error));
    };

    const handleDeleteCategory = (id: number) => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) {
            return;
        }
        axios.delete(`${apiHost}/admin/category/delete`, { params: { id } })
            .then(() => {
                setCategories(categories.filter(category => category.id !== id))
                alert('삭제되었습니다');
            })
            .catch(error => console.error('Error deleting category:', error));
    };

    const handleToggleVisibility = (id: number) => {
        setCategories(categories.map(category =>
            category.id === id ? { ...category, visible: !category.visible } : category
        ));
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reorderedCategories = Array.from(categories);
        const [removed] = reorderedCategories.splice(result.source.index, 1);
        reorderedCategories.splice(result.destination.index, 0, removed);
        setCategories(reorderedCategories);
    };

    return (
        <div>
            <h2>카테고리 관리</h2>
            <button onClick={() => setShowAddModal(true)}>+ 카테고리 추가</button>
            {showAddModal && (
                <div className="modal">
                    <h3>카테고리 추가</h3>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="카테고리 이름"
                    />
                    <button onClick={handleAddCategory}>저장</button>
                    <button onClick={() => setShowAddModal(false)}>취소</button>
                </div>
            )}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="categories">
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {categories.map((category, index) => (
                                <Draggable key={category.id} draggableId={String(category.id)} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={category.id}>
                                            <span>{category.name}</span>
                                            <button onClick={() => handleToggleVisibility(category.id)}>
                                                {category.visible ? '노출 끄기' : '노출 켜기'}
                                            </button>
                                            <button onClick={() => handleDeleteCategory(category.id)}>삭제</button>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default CategoryManagement;
