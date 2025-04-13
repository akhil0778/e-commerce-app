import db from './db.js';

export const getAllCategories = async () => {
  return db('categories').select();
};

export const addCategory = async (category) => {
  const { name, itemCount, imageUrl } = category;
  return db('categories').insert({ name, itemCount, imageUrl });
};

export const updateCategory = async (id, category) => {
  const { name, itemCount, imageUrl } = category;
  return db('categories').where({ id }).update({ name, itemCount, imageUrl });
};
