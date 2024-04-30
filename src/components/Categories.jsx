import React from "react";

const Categories = ({ categoryId, setCategoryId }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((el, id) => (
          <li
            key={id}
            onClick={() => setCategoryId(id)}
            className={categoryId === id ? "active" : ""}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
