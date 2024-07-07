import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CategoryProps {
    onCategoryClick: (category: string) => void;
}

const categoryDisplayNames: { [key: string]: string } = {
    coffee: 'Coffee',
    tea: 'Tea',
    frappuccino: 'Frappuccino',
    'non-coffee': 'Non-Coffee',
    desserts: 'Desserts'
};

const Category: React.FC<CategoryProps> = ({ onCategoryClick }) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data.map((category: { name: string }) => category.name));
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="category">
            {categories.map(category => (
                <button
                    key={category}
                    className="category-button"
                    onClick={() => onCategoryClick(category)}
                >
                    {categoryDisplayNames[category.toLowerCase()]}
                </button>
            ))}
        </nav>
    );
}

export default Category;
