// src/components/AdminNavbar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings, LayoutDashboard } from 'lucide-react';

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-center">
        <span className="text-blue-500">Admin</span> Panel
      </div>

      <ul className="flex flex-col p-4 gap-3">
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              isActive('/dashboard') ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
            {/* Show icon only on small screens */}
            <LayoutDashboard className="block md:hidden" size={18} />
            <span className="text-sm md:text-base">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              isActive('/settings') ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
            <Settings className="block md:hidden" size={18} />
            <span className="text-sm md:text-base">Settings</span>
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-red-600 transition"
          >
            <LogOut className="block md:hidden" size={18} />
            <span className="text-sm md:text-base">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
