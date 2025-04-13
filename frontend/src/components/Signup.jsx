import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api';

const SignupPage = () => {
  const [userData, setUserData] = useState({ username: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const data = await signupUser(userData);
      setSuccessMessage('Account created successfully!');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
