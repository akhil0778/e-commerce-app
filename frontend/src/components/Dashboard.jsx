import React, { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory } from '../services/api';
import CategoryForm from '../components/CategoryForm';
import AdminNavbar from '../components/AdminNavbar';
import { Pencil } from 'lucide-react';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddClick = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
      } else {
        await addCategory(formData);
      }
      fetchCategories();
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminNavbar />
      <div className="p-6 w-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-semibold">Category List</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
            onClick={handleAddClick}
          >
            Add Category
          </button>
        </div>
        {showForm && (
          <CategoryForm
            category={editingCategory}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        )}
        <div className="flex-1 overflow-hidden">
          <div className="h-full sm:h-auto sm:max-h-full overflow-y-auto sm:overflow-visible pr-1 sm:pr-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                key={category.id}
                className="relative group bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg sm:text-xl font-semibold">{category.name}</h3>
                <p className="text-gray-600 text-sm">Items: {category.itemCount}</p>
              
                {/* Button: Always visible on mobile, shows on hover on md+ */}
                <div className="absolute top-4 right-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                   <Pencil className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>              
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
