import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Option {
    id: number;
    name: string;
    items: { name: string, price: number }[];
    required: boolean;
}

/**
 * OptionManagement 컴포넌트
 * - 옵션 추가 및 편집 기능을 포함
 */
const OptionManagement: React.FC = () => {
    const [options, setOptions] = useState<Option[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newOptionName, setNewOptionName] = useState('');
    const [newOptionItems, setNewOptionItems] = useState<{ name: string, price: number }[]>([]);
    const [newOptionRequired, setNewOptionRequired] = useState(false);

    // 서버에서 옵션 목록 가져오기
    useEffect(() => {
        axios.get('/api/menus/select-custom-option')
            .then(response => setOptions(response.data))
            .catch(error => console.error('Error fetching options:', error));
    }, []);


    // 옵션 추가
    const handleAddOption = () => {
        axios.post('/api/options', { name: newOptionName, items: newOptionItems, required: newOptionRequired })
            .then(response => {
                setOptions([...options, response.data]);
                setShowAddModal(false);
                setNewOptionName('');
                setNewOptionItems([]);
                setNewOptionRequired(false);
            })
            .catch(error => console.error('Error adding option:', error));
    };

    // 옵션 삭제
    const handleDeleteOption = (id: number) => {
        axios.delete(`/api/options/${id}`)
            .then(() => setOptions(options.filter(option => option.id !== id)))
            .catch(error => console.error('Error deleting option:', error));
    };

    return (
        <div>
            <h2>옵션 관리</h2>
            <button onClick={() => setShowAddModal(true)}>+ 옵션 추가</button>
            {showAddModal && (
                <div className="modal">
                    <h3>옵션 추가</h3>
                    <input
                        type="text"
                        value={newOptionName}
                        onChange={(e) => setNewOptionName(e.target.value)}
                        placeholder="옵션 이름"
                    />
                    {/* 여기에서 옵션 항목 추가 폼 구현 */}
                    <button onClick={handleAddOption}>저장</button>
                    <button onClick={() => setShowAddModal(false)}>취소</button>
                </div>
            )}
            <ul>
                {options.map(option => (
                    <li key={option.id}>
                        <span>{option.name}</span>
                        <button onClick={() => handleDeleteOption(option.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OptionManagement;
