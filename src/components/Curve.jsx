import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Curve = () => {
  const [yieldStrength, setYieldStrength] = useState("70000");
  const [ultimateStrength, setUltimateStrength] = useState("90000");
  const [elasticModulus, setElasticModulus] = useState("28000000");
  const [percentElongation, setPercentElongation] = useState("10");
  const [graphData, setGraphData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const calculateGraphData = () => {
    if (!yieldStrength || !ultimateStrength || !elasticModulus || !percentElongation) {
      alert("Please fill all inputs!");
      return;
    }

    const ys = parseFloat(yieldStrength);
    const us = parseFloat(ultimateStrength);
    const em = parseFloat(elasticModulus);
    const pe = parseFloat(percentElongation) / 100;

    const yieldStrain = ys / em;
    const ultimateStrain = pe;
    const dataPoints = [];
    const tablePoints = [];

    const elasticSteps = 50;
    for (let i = 0; i <= elasticSteps; i++) {
      const strain = (yieldStrain / elasticSteps) * i;
      const stress = strain * em;
      dataPoints.push({ strain, stress });
      tablePoints.push({ strain, stress });
    }

    const plasticSteps = 50;
    for (let i = 1; i <= plasticSteps; i++) {
      const fraction = i / plasticSteps;
      const strain = yieldStrain + fraction * (ultimateStrain - yieldStrain);
      const stress = ys + (us - ys) * Math.pow(fraction, 0.5);
      dataPoints.push({ strain, stress });
      tablePoints.push({ strain, stress });
    }

    dataPoints.push({ strain: ultimateStrain, stress: us });
    tablePoints.push({ strain: ultimateStrain, stress: us });

    setGraphData({
      labels: dataPoints.map((point) => point.strain.toFixed(3)),
      datasets: [
        {
          label: "Stress-Strain Curve",
          data: dataPoints.map((point) => ({ x: point.strain, y: point.stress })),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    });

    setTableData(tablePoints);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      axis: 'x'
    },
    plugins: {
      legend: {
        display: true,
        position: "top",

      },
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Strain (ε)",
        },
        min: 0,
        max: parseFloat(percentElongation) / 100 + 0.01,
      },
      y: {
        title: {
          display: true,
          text: "Stress (σ)",
        },
        min: 0,
        max: parseFloat(ultimateStrength) * 1.3 || 1,
      },
    },
  };

  return (
    <div className="Curve w-full h-full pt-24 bg-white flex flex-wrap p-4">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex flex-col space-y-6 pr-4 mb-4 md:mb-0">
        <div className="bg-white shadow-lg border-2 border-gray-300 rounded-lg p-6 flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Material Property Inputs</h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Yield Strength (psi):
            </label>
            <input
              type="number"
              value={yieldStrength}
              onChange={(e) => setYieldStrength(e.target.value)}
              className="w-full px-4 py-1 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Ultimate Strength (psi):
            </label>
            <input
              type="number"
              value={ultimateStrength}
              onChange={(e) => setUltimateStrength(e.target.value)}
              className="w-full px-4 py-1 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Elastic Modulus (psi):
            </label>
            <input
              type="number"
              value={elasticModulus}
              onChange={(e) => setElasticModulus(e.target.value)}
              className="w-full px-4 py-1 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              % Elongation:
            </label>
            <input
              type="number"
              value={percentElongation}
              onChange={(e) => setPercentElongation(e.target.value)}
              className="w-full px-4 py-1 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            onClick={calculateGraphData}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Generate Graph
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white border-2 border-gray-300 shadow-lg rounded-lg p-6 flex-1 overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Stress-Strain Points</h2>
          <div className="overflow-y-auto max-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Strain</th>
                  <th className="border px-4 py-2">Stress (psi)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((point, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"} // Alternate row colors
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{point.strain.toFixed(6)}</td>
                    <td className="border px-4 py-2">{point.stress.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Section: Graph */}
      <div className="w-full md:w-2/3 bg-white border-2 border-black shadow-lg rounded-lg p-6 flex items-center justify-center">
        {graphData ? (
          <div style={{ width: "100%", height: "500px" }}>
            <Line data={graphData} options={options} />
          </div>
        ) : (
          <p className="text-gray-500 text-center">Graph will appear here after generating.</p>
        )}
      </div>
    </div>
  );
};

export default Curve;
