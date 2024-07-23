import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend} from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

interface ILineChart {
  wpms: number[];
}
const LineChart = ({wpms}: ILineChart) => {
  const labels = Array.from({length: wpms.length }, () => 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'WPM(word per minutes)',
        data: [...wpms],
        backgroundColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: false,
          boxWidth: 0,
          padding: 0,
        },
        onClick: () => null,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        beginAtZero: false,
        min: Math.min(...wpms),
        grid: { display: true },
        ticks: {
          display: true,
          callback: (value: number, index: number, ticks: number[]) => {
            if (index === 0 || index === ticks.length-1) {
              return Math.round(value);
            }
            return '';
          },
        },
      }
    },
    elements: {
      point: { radius: 0 },
      line: { tension: 0.4 }
    }
  }
  
  return (
    <Line
      data={data}
      // @ts-ignore
      options={options}
    />
  );
}

export default LineChart;