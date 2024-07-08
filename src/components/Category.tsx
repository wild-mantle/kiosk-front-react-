import React from 'react';

interface CategoryProps {
    categories: { id: number, name: string }[];
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
