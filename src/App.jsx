import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MathSolverPage from './pages/MathSolverPage';
import PhysicsSolverPage from './pages/PhysicsSolverPage';
import ResultPage from './pages/ResultPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';  // Import NavBar
import './index.css';

function App() {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/math-solver" element={<MathSolverPage />} />
        <Route path="/physics-solver" element={<PhysicsSolverPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
