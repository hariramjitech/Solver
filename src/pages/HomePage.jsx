// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <motion.div
        className="text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">Math & Physics Solver</h1>
        <p className="mb-6">Solve problems, upload images, and explore formulas easily!</p>
        <div className="space-x-4">
          <Link to="/math-solver">
            <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition duration-300">Math Solver</button>
          </Link>
          <Link to="/physics-solver">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-400 transition duration-300">Physics Solver</button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
