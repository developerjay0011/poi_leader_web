import { FC } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartData } from '../leader/pages/AnalyticsPage';



interface LineChartProps {
  data: ChartData[];
}

export const CusLineChart: FC<LineChartProps> = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='In Progress' stroke='#8884d8' />
          <Line type='monotone' dataKey='Completed' stroke='#82ca9d' />
          <Line type='monotone' dataKey='Not Started Yet' stroke='#ffc658' />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
