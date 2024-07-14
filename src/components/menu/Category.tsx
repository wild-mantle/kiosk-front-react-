import React from 'react';
import { Category as CategoryType } from '../../types';

interface CategoryProps {
    categories: CategoryType[];
    onCategoryClick: (categoryId: number) => void;
}

const Category: React.FC<CategoryProps> = ({ categories, onCategoryClick }) => {
    return (
        <nav className="category">
            {categories.map(category => (
                <button key={category.id} className="category-button" onClick={() => onCategoryClick(category.id)}>
                    {category.name}
                </button>
            ))}
        </nav>
    );
}

export default Category;
