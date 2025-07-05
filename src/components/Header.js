import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to login page on logout
    navigate('/login');
  };

  return (
    <header className="bg-indigo-100 p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <circle cx="32" cy="32" r="30" stroke="#4F46E5" strokeWidth="4" fill="#EEF2FF" />
          <path d="M32 18C28 12 18 16 18 24C18 32 32 42 32 42C32 42 46 32 46 24C46 16 36 12 32 18Z" fill="#4F46E5" />
          <text href= '' x="50%" y="90%" textAnchor="middle" fill="#4F46E5" fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold">
            WishNest
          </text>
        </svg>
        <h1 className="text-2xl font-bold text-indigo-700">WishNest</h1>
      </div>
      <button
        onClick={handleLogout}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        aria-label="Logout"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
