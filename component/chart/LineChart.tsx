import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  ChartOptions,
  Tick,
  Tooltip
} from "chart.js";
import { Line } from 'react-chartjs-2';
import lodash from "lodash";
import {getCSSVariable} from "@/utils/getCSSVariable";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

interface ILineChart {
  customOptions?: ChartOptions<'line'>;
  wpms: number[];
  title?: string;
  Ytitle?: string;
  Xtitle?: string;
}
const LineChart = ({customOptions, wpms, title, Ytitle, Xtitle}: ILineChart) => {
  const labels = Array.from({length: wpms.length }, () => 0);
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: title || '',
        data: [...wpms],
        borderColor: getCSSVariable('--accent-color'),
        backgroundColor: getCSSVariable('--accent-color'),
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  }
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: false,
          boxWidth: 0,
          padding: 0,
          color: getCSSVariable('--primary-color'),
        },
        onClick: () => null, // title click disable
      },
      tooltip: {
        enabled: false,
        mode: 'nearest',
        intersect: false, // 가장 가까운 포인트에 툴팁 표시
        position: 'nearest',
      },
      
    },
    interaction: {
      mode: 'nearest', // 가장 가까운 점에 대해 호버링 활성화
      axis: 'x',  // x축을 기준으로 호버링
      intersect: false
    },
    scales: {
      x: {
        title: {
          display: true,
          text: Xtitle,
        },
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        title: {
          display: true,
          text: Ytitle,
        },
        beginAtZero: false,
        min: Math.min(...wpms),
        grid: { display: true },
        ticks: {
          display: true,
          // @ts-ignore
          callback: (tickValue: number, index: number, ticks: Tick[]) => {
            if (index === 0 || index === ticks.length-1) {
              return Math.round(tickValue);
            }
            return null;
          },
        },
      }
    },
    elements: {
      point: { radius: 0 },
      line: { tension: 0.4 }
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0
      }
    }
  }
  
  // Deep merge
  const mergedOptions = lodash.mergeWith({}, options, customOptions);
  
  return (
    <Line
      data={data}
      options={mergedOptions}
    />
  );
}

export default LineChart;