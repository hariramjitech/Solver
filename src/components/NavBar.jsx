// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around text-white">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/math-solver">Math Solver</Link>
        </li>
        <li>
          <Link to="/physics-solver">Physics Solver</Link>
        </li>
        <li>
          <Link to="/result">Result</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
