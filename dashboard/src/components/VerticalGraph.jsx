import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Holdings",
    },
  },
};

// Make component the default export so Vite React Fast Refresh can correctly
// distinguish the React component export from other named exports (like
// `options`). This avoids the HMR message:
// "Could not Fast Refresh ("options" export is incompatible)".
export default function VerticalGraph({ data }) {
  return <Bar options={options} data={data} />;
}
