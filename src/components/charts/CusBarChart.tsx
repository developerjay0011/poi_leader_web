import { FC } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartData } from '../leader/pages/AnalyticsPage';


interface CusAreaChartProps {
  data: ChartData[];
}

export const CusBarChart: React.FC<CusAreaChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='In Progress' fill='#8884d8' />
        <Bar dataKey='Completed' fill='#82ca9d' />
        <Bar dataKey='Not Started Yet' fill='#ffc658' />
      </BarChart>
    </ResponsiveContainer>
  )
}
