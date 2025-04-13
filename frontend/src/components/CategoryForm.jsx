import React, { useState, useEffect } from 'react';

const CategoryForm = ({ onSubmit, category, onCancel }) => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    imageUrl: '',
    itemCount: 0,
  });

  useEffect(() => {
    if (category) {
      setCategoryData(category);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(categoryData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{category ? 'Edit Category' : 'Add Category'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={categoryData.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Item Count</label>
            <input
              type="number"
              name="itemCount"
              value={categoryData.itemCount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
