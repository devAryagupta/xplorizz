import React, { useState } from 'react';

interface CategoryNavigationProps {
  onSelectCategory?: (category: string) => void;
}

const categories = ['Adventure', 'Nature', 'Heritage', 'Budget', 'Wildlife'];

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<string>('');

  const handleSelect = (category: string) => {
    setActiveCategory(category);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <div className="category-navigation">
      {categories.map((cat) => (
        <button
          key={cat}
          className={activeCategory === cat ? 'active' : ''}
          onClick={() => handleSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavigation;