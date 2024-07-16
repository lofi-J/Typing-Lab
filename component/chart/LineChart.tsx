import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend} from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

interface ILineChart {
  wpms: number[];
  times: string[];
}
const LineChart = ({wpms, times}: ILineChart) => {
  
  const data = {
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: [
      {
        label: 'WPM(word per minutes)',
        data: [...wpms],
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