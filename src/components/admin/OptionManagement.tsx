import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

interface Option {
    id: number;
    name: string;
    additionalPrice: number;
    menuName: string;
    // required: boolean;
    items: { name: string, price: number }[];
}

const OptionManagement: React.FC = () => {
    const [options, setOptions] = useState<Option[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newOptionName, setNewOptionName] = useState('');
    const [newOptionItems, setNewOptionItems] = useState<{ name: string, price: number }[]>([]);
    // const [newOptionRequired, setNewOptionRequired] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState(0);
    const [sortKey, setSortKey] = useState<'id' | 'menuName'>('id');
    const apiHost = "http://localhost:8080";

    useEffect(() => {
        axios.get(`${apiHost}/api/menus/all-custom-options-with-menu-name`)
            .then(response => setOptions(response.data))
            .catch(error => console.error('Error fetching options:', error));
    }, []);

    const handleAddOption = () => {
        // axios.post(`${apiHost}/api/menus/add-custom-option`, { name: newOptionName, items: newOptionItems, required: newOptionRequired })
        axios.post(`${apiHost}/api/menus/add-custom-option`, { name: newOptionName, items: newOptionItems})
            .then(response => {
                setOptions([...options, response.data]);
                setShowAddModal(false);
                setNewOptionName('');
                setNewOptionItems([]);
            })
            .catch(error => console.error('Error adding option:', error));
    };

    const handleDeleteOption = (id: number) => {
        axios.delete(`${apiHost}/api/menus/delete-custom-option/${id}`)
            .then(() => setOptions(options.filter(option => option.id !== id)))
            .catch(error => console.error('Error deleting option:', error));
    };

    const handleAddItemToOption = () => {
        setNewOptionItems([...newOptionItems, { name: newItemName, price: newItemPrice }]);
        setNewItemName('');
        setNewItemPrice(0);
    };

    const sortedOptions = [...options].sort((a, b) => {
        if (sortKey === 'id') {
            return a.id - b.id;
        } else if (sortKey === 'menuName') {
            return a.menuName.localeCompare(b.menuName);
        }
        return 0;
    });

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
                        placeholder="추가할 옵션 이름"
                    />
                    <div>
                        <h4>옵션 항목 추가</h4>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="상품 이름"
                        />
                        <input
                            type="number"
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(parseFloat(e.target.value))}
                            placeholder="옵션 가격"
                            // 만약 옵션이 SIZE 면 가격은 상관없이(default 값) 입력
                        />
                        <button onClick={handleAddItemToOption}>항목 추가</button>
                    </div>
                    <div>
                        {newOptionItems.map((item, index) => (
                            <div key={index}>
                                <span>{item.name} - {item.price}원</span>
                            </div>
                        ))}
                    </div>
                    {/*<label>*/}
                    {/*    필수 여부*/}
                    {/*    <input*/}
                    {/*        type="checkbox"*/}
                    {/*        checked={newOptionRequired}*/}
                    {/*        onChange={(e) => setNewOptionRequired(e.target.checked)}*/}
                    {/*    />*/}
                    {/*</label>*/}
                    <button onClick={handleAddOption}>저장</button>
                    <button onClick={() => setShowAddModal(false)}>취소</button>
                </div>
            )}
            <div>
                <label>정렬 기준: </label>
                <select value={sortKey} onChange={(e) => setSortKey(e.target.value as 'id' | 'menuName')}>
                    <option value="id">옵션 ID</option>
                    <option value="menuName">상품명</option>
                </select>
            </div>
            <ul>
                {sortedOptions.map(option => (
                    <li key={option.id}>
                        <span>상품명 : {option.menuName} / 적용된 옵션 : {option.name} / 가격 : {option.additionalPrice}</span>
                        <button onClick={() => handleDeleteOption(option.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OptionManagement;
