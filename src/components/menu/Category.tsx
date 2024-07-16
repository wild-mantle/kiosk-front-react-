import React from 'react';
import { Category as CategoryType } from '../../types';
import styled from 'styled-components';

interface CategoryProps {
    categories: CategoryType[];
    onCategoryClick: (categoryId: number) => void;
}

const CategoryWrapper = styled.nav`
    display: flex;
    justify-content: space-around;
`;

const CategoryButton = styled.button`
    background-color: ${({ theme }) => theme.categoryBgColor};
    color: ${({ theme }) => theme.categoryColor};
    border: none;
    padding: 1rem;
    cursor: pointer;
`;

const Category: React.FC<CategoryProps> = ({ categories, onCategoryClick }) => {
    return (
        <CategoryWrapper>
            {categories.map(category => (
                <CategoryButton key={category.id} onClick={() => onCategoryClick(category.id)}>
                    {category.name}
                </CategoryButton>
            ))}
        </CategoryWrapper>
    );
}

export default Category;
