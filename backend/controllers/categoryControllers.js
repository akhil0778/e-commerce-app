import {
    getAllCategories,
    addCategory,
    updateCategory,
  } from '../models/category.js';
  
  export const getCategories = async (req, res) => {
    const categories = await getAllCategories();
    res.json(categories);
  };
  
  export const addNewCategory = async (req, res) => {
    await addCategory(req.body);
    res.status(201).json({ message: 'Category added' });
  };
  
  export const editCategory = async (req, res) => {
    const { id } = req.params;
    await updateCategory(id, req.body);
    res.json({ message: 'Category updated' });
  };
  