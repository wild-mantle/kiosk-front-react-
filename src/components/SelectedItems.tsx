import React from 'react';
import ProductList from "./ProductList";

const SelectedItems: React.FC = () => {
    return (
        <div className="selected-items">
            <h2>선택한 상품</h2>
            <ul>
                {/* 선택한 상품 리스트를 여기서 렌더링 */}
                <ProductList />
            </ul>
            <button>전체삭제</button>
        </div>
    );
}

export default SelectedItems;
