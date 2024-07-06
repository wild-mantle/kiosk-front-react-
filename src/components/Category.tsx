import React from 'react';

interface CategoryProps {
    categories: string[];
    categoryMap: { [key: string]: string };
    onCategoryClick: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ categories, categoryMap, onCategoryClick }) => {
    return (
        <nav className="category">
            {categories.map(category => (
                <button key={category} className="category-button" onClick={() => onCategoryClick(category)}>
                    {categoryMap[category]}
                </button>
            ))}
        </nav>
    );
}

export default Category;
