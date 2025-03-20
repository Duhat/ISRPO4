import React, { useState, useEffect } from 'react';
import './Categories.css'
const Categories = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dart-server-back.up.railway.app/api/category');
        const data = await response.json();
        setCategories(data); // Предполагается, что API возвращает массив категорий
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setShowAll(false); // Сбрасываем флаг "Все" при выборе конкретной категории
    onCategorySelect(category); // Обновляем выбранную категорию в родительском компоненте
  };

  const handleShowAllClick = () => {
    setActiveCategory(null); // Сбрасываем выбранную категорию
    setShowAll(true); // Устанавливаем флаг "Все"
    onCategorySelect('All'); // Вызываем функцию с значением "All"
  };

  return (
    <div className="categories">
      <h2>Категории</h2>
      <ul className="categories-list">
        <li
          className={`category ${showAll ? 'active' : ''}`}
          onClick={handleShowAllClick}
        >
          Все
        </li>
        {categories.map((category, index) => (
          <li
            key={category.id || index} // Используйте id, если он есть, иначе индекс
            className={`category ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name} {/* Предполагается, что у категории есть свойство name */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;