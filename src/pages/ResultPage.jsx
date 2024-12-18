import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { result, additionalDetails } = location.state || {};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-1/2">
        <h2 className="text-3xl font-bold mb-4">Solution Details</h2>

        {result ? (
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Result:</h3>
            <p className="text-2xl font-bold text-green-600">{result}</p>
          </div>
        ) : (
          <p className="text-xl mb-4 text-red-500">No result available</p>
        )}

        {additionalDetails ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Detailed Steps:</h3>
            <pre className="text-base text-gray-700 whitespace-pre-wrap">{additionalDetails}</pre>
          </div>
        ) : (
          <p className="mt-4 text-xl text-gray-500">No detailed steps available</p>
        )}

        <Link to="/">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
