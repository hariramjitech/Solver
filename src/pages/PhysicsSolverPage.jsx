import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate from react-router-dom

const PhysicsSolverPage = () => {
  const [selectedFormula, setSelectedFormula] = useState('');
  const [mass, setMass] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [velocity, setVelocity] = useState('');
  const [height, setHeight] = useState('');
  const [force, setForce] = useState(null);
  const [kineticEnergy, setKineticEnergy] = useState(null);
  const [potentialEnergy, setPotentialEnergy] = useState(null);
  const [stepByStep, setStepByStep] = useState('');
  
  const formulas = [
    { name: 'Force', equation: 'F = m × a', variables: ['mass', 'acceleration'] },
    { name: 'Kinetic Energy', equation: 'KE = 1/2 × m × v^2', variables: ['mass', 'velocity'] },
    { name: 'Potential Energy', equation: 'PE = m × g × h', variables: ['mass', 'height'] },
  ];

  const calculate = () => {
    if (selectedFormula === 'Force') {
      const result = parseFloat(mass) * parseFloat(acceleration);
      setForce(result);
      setStepByStep(`Step 1: Use the formula F = m × a\nStep 2: F = ${mass} × ${acceleration}\nStep 3: Force = ${result} N`);
    } else if (selectedFormula === 'Kinetic Energy') {
      const result = 0.5 * parseFloat(mass) * Math.pow(parseFloat(velocity), 2);
      setKineticEnergy(result);
      setStepByStep(`Step 1: Use the formula KE = 1/2 × m × v^2\nStep 2: KE = 1/2 × ${mass} × ${velocity}^2\nStep 3: Kinetic Energy = ${result} J`);
    } else if (selectedFormula === 'Potential Energy') {
      const result = parseFloat(mass) * 9.81 * parseFloat(height); // Assuming g = 9.81 m/s^2
      setPotentialEnergy(result);
      setStepByStep(`Step 1: Use the formula PE = m × g × h\nStep 2: PE = ${mass} × 9.81 × ${height}\nStep 3: Potential Energy = ${result} J`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-1/2">
        <h2 className="text-3xl font-bold mb-4">Physics Formula Solver</h2>

        {/* Formula selection */}
        <select
          value={selectedFormula}
          onChange={(e) => setSelectedFormula(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Select Formula</option>
          {formulas.map((formula, index) => (
            <option key={index} value={formula.name}>
              {formula.name}
            </option>
          ))}
        </select>

        {/* Input fields based on the selected formula */}
        {selectedFormula === 'Force' && (
          <>
            <input
              type="number"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              placeholder="Enter mass (kg)"
              className="border p-2 mb-4 w-full"
            />
            <input
              type="number"
              value={acceleration}
              onChange={(e) => setAcceleration(e.target.value)}
              placeholder="Enter acceleration (m/s^2)"
              className="border p-2 mb-4 w-full"
            />
          </>
        )}

        {selectedFormula === 'Kinetic Energy' && (
          <>
            <input
              type="number"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              placeholder="Enter mass (kg)"
              className="border p-2 mb-4 w-full"
            />
            <input
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(e.target.value)}
              placeholder="Enter velocity (m/s)"
              className="border p-2 mb-4 w-full"
            />
          </>
        )}

        {selectedFormula === 'Potential Energy' && (
          <>
            <input
              type="number"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              placeholder="Enter mass (kg)"
              className="border p-2 mb-4 w-full"
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height (m)"
              className="border p-2 mb-4 w-full"
            />
          </>
        )}

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition duration-300 w-full"
        >
          Calculate
        </button>

        {/* Results Section */}
        {force !== null && selectedFormula === 'Force' && (
          <div className="mt-4">
            <h3 className="text-xl">Force:</h3>
            <p className="text-2xl font-bold">{force} N</p>
          </div>
        )}

        {kineticEnergy !== null && selectedFormula === 'Kinetic Energy' && (
          <div className="mt-4">
            <h3 className="text-xl">Kinetic Energy:</h3>
            <p className="text-2xl font-bold">{kineticEnergy} J</p>
          </div>
        )}

        {potentialEnergy !== null && selectedFormula === 'Potential Energy' && (
          <div className="mt-4">
            <h3 className="text-xl">Potential Energy:</h3>
            <p className="text-2xl font-bold">{potentialEnergy} J</p>
          </div>
        )}

        {/* Step by Step Calculation */}
        {stepByStep && (
          <div className="mt-4">
            <h3 className="text-xl">Step-by-Step Calculation:</h3>
            <pre className="bg-gray-200 p-4 rounded-lg">{stepByStep}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicsSolverPage;
