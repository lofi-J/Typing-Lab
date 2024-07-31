import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  ChartOptions,
  Tick,
  Tooltip, ChartData
} from "chart.js";
import { Line } from 'react-chartjs-2';
import lodash from "lodash";
import {getCSSVariable} from "@/utils/getCSSVariable";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

interface IdatasetsOptions {
  label?: string;
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
}

interface ILineChart {
  customOptions?: ChartOptions<'line'>;
  customData?: ChartData<'line'>;
  chartOptions?: IdatasetsOptions;
  wpms: number[];
  title?: string;
  Ytitle?: string;
  Xtitle?: string;
}
const LineChart = ({customOptions, customData, chartOptions, wpms, title, Ytitle, Xtitle}: ILineChart) => {
  const labels = Array.from({length: wpms.length }, (_, index) => index + 1);
  
  const data: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: title || '',
        data: [...wpms],
        borderColor: chartOptions?.borderColor || getCSSVariable('--chart-color'),
        backgroundColor: chartOptions?.backgroundColor || getCSSVariable('--chart-color'),
        borderWidth: chartOptions?.borderWidth || 2,
        pointRadius: chartOptions?.pointRadius || 0,
        pointHoverRadius: chartOptions?.pointHoverRadius || 5,
      },
    ],
  }
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          usePointStyle: false,
          boxWidth: 0,
          padding: 0,
          color: getCSSVariable('--chart-color'),
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
          color: getCSSVariable('--accent-color'),
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
        bottom: 0,
        left: 0,
        right: 0,
      }
    }
  }
  
  // Deep merge
  const mergedOptions = lodash.mergeWith({}, options, customOptions);
  const mergedData = lodash.mergeWith({}, data, customData);
  
  return (
    <Line
      data={mergedData}
      options={mergedOptions}
    />
  );
}

export default LineChart;