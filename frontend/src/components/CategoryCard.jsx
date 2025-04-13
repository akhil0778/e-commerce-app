import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={category.imageUrl} alt={category.name} className="w-full h-40 object-cover rounded-md mb-4" />
      <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
      <p className="text-gray-600">Items: {category.itemCount}</p>
    </div>
  );
};

export default CategoryCard;
