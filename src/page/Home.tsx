import { BarChart } from '@/components/bar-chart';
import PieChartComponent from '@/components/pie-chart';

export default function Home() {
  return (
    <div>
      <div className='flex justify-between'>
        <PieChartComponent />
        <PieChartComponent />
        <PieChartComponent />
        <PieChartComponent />
      </div>
      <BarChart />
    </div>
  );
}
