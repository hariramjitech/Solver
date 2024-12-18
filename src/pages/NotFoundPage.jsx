// src/pages/NotFoundPage.js
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-1/2 text-center">
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg">Sorry, the page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
