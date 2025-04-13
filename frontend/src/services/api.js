import axios from 'axios';

// Base API URL (you can replace this with the actual URL in production)
const API_URL = 'http://localhost:5000/api';

// Get the Authorization token from local storage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if available
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Signup failed' };
  }
};

// Category APIs

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch categories' };
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post('/categories/addcategory', categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add category' };
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axiosInstance.put(`/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update category' };
  }
};

