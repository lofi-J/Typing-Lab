import { ChartOptions } from 'chart.js';

export const historyChartOption: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {
        title: (tooltipItems) => {
          const progress = tooltipItems[0].label; // x축(progress)
          const wpm = tooltipItems[0].raw; // y축(wpm)
          return `Progress: ${progress}\nWPM: ${wpm}`;
        },
        label: () => ''
      }
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
      position: 'left',
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      borderWidth: 1,
    },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 15
    },
  },
};