import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-2">404</h1>
      <p className="text-lg text-gray-700 mb-4">Oops! Page not found.</p>
      <Link to="/" className="text-white bg-[#CC1D1D] hover:bg-[#A00E0E] px-4 py-2 rounded transition">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
