import React, { useState, useCallback, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { motion } from 'framer-motion';

const AdvancedCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Handle button clicks
  const handleButtonClick = useCallback((value) => {
    setInput((prev) => prev + value);
  }, []);

  // Calculate result
  const calculateResult = useCallback(() => {
    try {
      const res = evaluate(input);
      setResult(res);
    } catch {
      setResult('Invalid Expression');
    }
  }, [input]);

  // Clear input and result
  const clearInput = useCallback(() => {
    setInput('');
    setResult('');
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      const validKeys = /[0-9+\-*/^().]|Enter|Backspace/;
      if (validKeys.test(e.key)) {
        if (e.key === 'Enter') {
          calculateResult();
        } else if (e.key === 'Backspace') {
          setInput((prev) => prev.slice(0, -1));
        } else {
          setInput((prev) => prev + e.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [calculateResult]);

  return (
    <motion.div
      className="w-96 mx-auto bg-white p-6 rounded-xl shadow-xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Advanced Calculator</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-600">Expression:</p>
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <p className="text-sm text-gray-600 mt-2">Result:</p>
        <p className="text-2xl font-semibold text-gray-800">{result}</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Numbers and operators */}
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '^', '+'].map((val) => (
          <motion.button
            key={val}
            onClick={() => handleButtonClick(val)}
            className="bg-gray-200 text-gray-800 px-6 py-5 rounded-lg hover:bg-gray-300 transition-all duration-200 text-xl"
            whileHover={{ scale: 1.05 }}
          >
            {val}
          </motion.button>
        ))}

        {/* Scientific Functions */}
        {['sin', 'cos', 'tan', 'log', 'sqrt'].map((func) => (
          <motion.button
            key={func}
            onClick={() => handleButtonClick(`${func}(`)}
            className="bg-blue-200 text-blue-800 px-4 py-5 rounded-lg hover:bg-blue-300 transition-all duration-200 text-xl"
            whileHover={{ scale: 1.05 }}
          >
            {func}
          </motion.button>
        ))}

        {/* Clear and Equals */}
        <motion.button
          onClick={clearInput}
          className="col-span-2 bg-red-500 text-white px-6 py-5 rounded-lg hover:bg-red-600 transition-all duration-200 text-xl"
          whileHover={{ scale: 1.05 }}
        >
          Clear
        </motion.button>
        <motion.button
          onClick={calculateResult}
          className="col-span-2 bg-green-500 text-white px-6 py-5 rounded-lg hover:bg-green-600 transition-all duration-200 text-xl"
          whileHover={{ scale: 1.05 }}
        >
          =
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AdvancedCalculator;
