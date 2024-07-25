"use client"

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  ChartOptions,
  Tooltip
} from "chart.js";
import { Line } from 'react-chartjs-2';
import {getCSSVariable} from "@/utils/getCSSVariable";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

export default function Test() {
  const labels = Array.from({length: 5 }, () => 0);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'none label',
        data: [1,2,3,4,5],
        backgroundColor: getCSSVariable('--accent-color'),
        borderColor: '#fff',
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  }
  const options: ChartOptions<'line'> = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: () => 'my tooltip'
        }
      }
    },
    
  }
  return (
    <main>
      <Line data={data} options={options}/>
    </main>
  );
}