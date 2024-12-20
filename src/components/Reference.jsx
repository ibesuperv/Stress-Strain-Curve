import React from "react";

function Reference() {
  return (
    <div className="Reference w-full h-full pt-24 bg-gray-50 p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Reference and Formulas</h1>
      
      {/* Stress Calculation */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Stress Calculation</h2>
        <p className="text-lg mb-4">
          Stress is calculated using different equations based on the region of the curve (elastic or plastic). 
          The formulas used are:
        </p>
        <div className="text-lg font-mono bg-gray-100 rounded p-4 border border-gray-300">
          For the elastic region: <br />
          <strong>σ = ε × E</strong>
        </div>
        <div className="text-lg font-mono bg-gray-100 rounded p-4 border border-gray-300 mt-4">
          For the plastic region: <br />
          <strong>σ = S<sub>y</sub> + (S<sub>u</sub> - S<sub>y</sub>) × (ε / ε<sub>f</sub>)<sup>n</sup></strong>
        </div>
        <p className="mt-4">
          Here:
        </p>
        <ul className="list-disc list-inside text-lg">
          <li><strong>σ</strong>: Stress</li>
          <li><strong>ε</strong>: Strain</li>
          <li><strong>E</strong>: Elastic modulus</li>
          <li><strong>S<sub>y</sub></strong>: Yield strength</li>
          <li><strong>S<sub>u</sub></strong>: Ultimate strength</li>
          <li><strong>ε<sub>f</sub></strong>: Strain at failure</li>
          <li><strong>n</strong>: Strain hardening exponent</li>
        </ul>
      </section>

      {/* Strain Calculation */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Strain Calculation</h2>
        <p className="text-lg mb-4">
          The strain values are calculated at different points as follows:
        </p>
        <div className="text-lg font-mono bg-gray-100 rounded p-4 border border-gray-300">
          Yield strain: <br />
          <strong>ε<sub>yield</sub> = S<sub>y</sub> / E</strong>
        </div>
        <div className="text-lg font-mono bg-gray-100 rounded p-4 border border-gray-300 mt-4">
          Strain at ultimate strength: <br />
          <strong>ε<sub>ultimate</sub> = ε<sub>yield</sub> + ε<sub>f</sub></strong>
        </div>
        <p className="mt-4">
          Additionally, the strain at failure, <strong>ε<sub>f</sub></strong>, is defined as the percent elongation divided by 100:
        </p>
        <div className="text-lg font-mono bg-gray-100 rounded p-4 border border-gray-300">
          <strong>ε<sub>f</sub> = eL / 100</strong>
        </div>
      </section>

      {/* Elastic and Plastic Strain */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Elastic and Plastic Strain</h2>
        <p className="text-lg mb-4">
          Total strain is the sum of elastic strain and plastic strain:
        </p>
        <div className="text-lg font-mono bg-gray-100 rounded p-4 border border-gray-300">
          <strong>ε<sub>total</sub> = ε<sub>elastic</sub> + ε<sub>plastic</sub></strong>
        </div>
        <p className="mt-4">
          Elastic strain is calculated as:
        </p>
        <div className="text-lg font-mono bg-gray-100 rounded p-4 border border-gray-300">
          <strong>ε<sub>elastic</sub> = σ / E</strong>
        </div>
        <p className="mt-4">
          Plastic strain is defined as the remaining strain after the elastic region.
        </p>
      </section>

      {/* Assumptions Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Assumptions</h2>
        <ul className="list-disc list-inside text-lg">
          <li>A plastic strain of <strong>0.002</strong> is assumed for yield calculations.</li>
          <li>Strain hardening follows the fractional power law with exponent <strong>n</strong>.</li>
          <li>Stress and strain are linearly related in the elastic region.</li>
        </ul>
      </section>
    </div>
  );
}

export default Reference;
