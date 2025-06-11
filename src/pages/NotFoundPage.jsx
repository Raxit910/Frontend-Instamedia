import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-red-400 px-4">
      <div className="text-center w-full max-w-md bg-white shadow-xl rounded-3xl p-6 md:p-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">404</h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-4">Page Not Found</p>
        <p className="text-sm text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
