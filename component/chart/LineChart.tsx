import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend} from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

interface ILineChart {
  wpms: number[];
}
const LineChart = ({wpms}: ILineChart) => {
  const data = {
    labels: [1,2,3,4,5],
    datasets: [
      {
        label: 'WPM(word per minutes)',
        data: [1000, 2000],
        backgroundColor: "#fff",
        borderColor: "#fff"
      },
    ],
  }
  return (
    <Line data={data} />
  );
}

export default LineChart;