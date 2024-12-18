import React, { useState, useCallback } from 'react';
import { evaluate } from 'mathjs';
import Tesseract from 'tesseract.js';
import AdvancedCalculator from '../components/AdvancedCalculator'; // Assuming your calculator component is called AdvancedCalculator

const MathSolverPage = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [highlight, setHighlight] = useState(false);

  // Formula Section States
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [formulaResult, setFormulaResult] = useState(null);
  const [formulaExplanation, setFormulaExplanation] = useState('');

  // List of formulas with variable names
  const formulas = [
    {
      name: 'Area of a Rectangle',
      formula: 'Area = length × width',
      variables: ['length', 'width'],
      calculate: (values) => values.length * values.width,
      explanation: (values) => `Area = ${values.length} × ${values.width}`,
    },
    {
      name: 'Perimeter of a Rectangle',
      formula: 'Perimeter = 2 × (length + width)',
      variables: ['length', 'width'],
      calculate: (values) => 2 * (values.length + values.width),
      explanation: (values) => `Perimeter = 2 × (${values.length} + ${values.width})`,
    },
    {
      name: 'Area of a Circle',
      formula: 'Area = π × radius²',
      variables: ['radius'],
      calculate: (values) => Math.PI * Math.pow(values.radius, 2),
      explanation: (values) => `Area = π × ${values.radius}²`,
    },
    {
      name: 'Circumference of a Circle',
      formula: 'Circumference = 2 × π × radius',
      variables: ['radius'],
      calculate: (values) => 2 * Math.PI * values.radius,
      explanation: (values) => `Circumference = 2 × π × ${values.radius}`,
    },
  ];

  const parseWordProblem = useCallback((text) => {
    try {
      const cleanedText = text.toLowerCase();
      let explanation = '';
      let expression = '';

      if (cleanedText.includes('area of a rectangle')) {
        const matches = cleanedText.match(/(\d+)\s*by\s*(\d+)/);
        if (matches) {
          const [_, length, width] = matches;
          explanation = `Area of a rectangle = length × width = ${length} × ${width}`;
          expression = `${length} * ${width}`;
        }
      } else if (cleanedText.includes('perimeter of a rectangle')) {
        const matches = cleanedText.match(/(\d+)\s*by\s*(\d+)/);
        if (matches) {
          const [_, length, width] = matches;
          explanation = `Perimeter of a rectangle = 2 × (length + width) = 2 × (${length} + ${width})`;
          expression = `2 * (${length} + ${width})`;
        }
      } else if (cleanedText.includes('area of a circle')) {
        const matches = cleanedText.match(/radius\s*(\d+)/);
        if (matches) {
          const [_, radius] = matches;
          explanation = `Area of a circle = π × radius² = π × ${radius}²`;
          expression = `pi * ${radius}^2`;
        }
      } else if (cleanedText.includes('perimeter of a circle') || cleanedText.includes('circumference')) {
        const matches = cleanedText.match(/radius\s*(\d+)/);
        if (matches) {
          const [_, radius] = matches;
          explanation = `Circumference of a circle = 2 × π × radius = 2 × π × ${radius}`;
          expression = `2 * pi * ${radius}`;
        }
      } else {
        explanation = `Parsed math expression: ${text}`;
        expression = text
          .replace(/\bplus\b/gi, '+')
          .replace(/\bminus\b/gi, '-')
          .replace(/\btimes\b|\bmultiplied by\b/gi, '*')
          .replace(/\bdivided by\b|\bover\b/gi, '/')
          .replace(/\bequals\b|\bis\b|\bcalculate\b|\bfind\b/gi, '')
          .replace(/[^\d+\-*/().pi]/g, '')
          .trim();
      }

      return { expression, explanation };
    } catch (err) {
      return { expression: '', explanation: 'Error parsing the problem.' };
    }
  }, []);

  const solveProblem = useCallback(() => {
    try {
      const { expression, explanation } = parseWordProblem(input);
      if (!expression) throw new Error('Unable to parse problem');

      const result = evaluate(expression);
      setResult(result);
      setExplanation(explanation);
      setHighlight(true);
    } catch (err) {
      setResult('Invalid or Unsupported Problem');
      setExplanation('Unable to solve the given problem.');
      setHighlight(true);
    }
  }, [input, parseWordProblem]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      Tesseract.recognize(file, 'eng').then(({ data: { text } }) => {
        setInput(text);
      });
    }
  };

  // Formula Section: Handle formula selection and calculation
  const handleFormulaSelect = (formula) => {
    setSelectedFormula(formula);
    setInputValues({});
    setFormulaResult(null);
    setFormulaExplanation('');
  };

  const handleFormulaInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: parseFloat(value),
    }));
  };

  const handleFormulaCalculate = () => {
    if (selectedFormula) {
      const { calculate, explanation } = selectedFormula;
      try {
        const result = calculate(inputValues);
        setFormulaResult(result);
        setFormulaExplanation(explanation(inputValues));
      } catch (error) {
        setFormulaResult('Invalid input');
        setFormulaExplanation('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-md flex gap-6">
        {/* Main Section: Math Solver and Formula Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Math Problem Solver</h1>

          {/* Math Problem Solver Section */}
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste a math problem"
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
              rows={5}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4 block w-full text-sm text-gray-600"
            />
            <button
              onClick={solveProblem}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 shadow-md"
            >
              Solve Problem
            </button>

            {/* Show result below */}
            {result !== null && (
              <div className={`mt-6 p-4 border rounded-lg text-center ${highlight ? 'animate-highlight' : ''}`}>
                <p className="text-xl font-bold">Result:</p>
                <p className="text-lg">{result}</p>
                <p className="text-sm mt-2 text-gray-600">{explanation}</p>
              </div>
            )}
          </div>

          {/* Formula Cards Section */}
          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">Select a Formula</h2>
            <div className="grid grid-cols-2 gap-6">
              {formulas.map((formula, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                  onClick={() => handleFormulaSelect(formula)}
                >
                  <h3 className="font-semibold text-lg">{formula.name}</h3>
                  <p>{formula.formula}</p>
                </div>
              ))}
            </div>

            {/* Formula Input Section */}
            {selectedFormula && (
              <div className="mt-6 p-4 border rounded-lg">
                <p className="font-semibold text-lg">{selectedFormula.formula}</p>
                {selectedFormula.variables.map((variable, index) => (
                  <div key={index} className="mt-2">
                    <label className="block text-sm text-gray-600">{variable}:</label>
                    <input
                      type="number"
                      name={variable}
                      value={inputValues[variable] || ''}
                      onChange={handleFormulaInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 mt-1 shadow-sm"
                      placeholder={`Enter ${variable}`}
                    />
                  </div>
                ))}
                <button
                  onClick={handleFormulaCalculate}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 shadow-md"
                >
                  Calculate
                </button>
                {formulaResult !== null && (
                  <div className="mt-4 text-center">
                    <p className="text-lg font-semibold">Result: {formulaResult}</p>
                    <p className="text-sm text-gray-600 mt-2">{formulaExplanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Calculator Section */}
        <div className=" bg-gray-100 p-6 rounded-lg shadow-lg">
          <AdvancedCalculator /> {/* Your calculator component */}
        </div>
      </div>
    </div>
  );
};

export default MathSolverPage;
