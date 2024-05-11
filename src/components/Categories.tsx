import React from 'react';

interface CategoriesProps {
  categoryId: number;
  setCategoryId: (id: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categoryId, setCategoryId }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((el, id) => (
          <li
            key={id}
            onClick={() => setCategoryId(id)}
            className={categoryId === id ? 'active' : ''}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
