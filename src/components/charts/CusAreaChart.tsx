import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartData } from '../leader/pages/AnalyticsPage'

interface CusAreaChartProps {
  data: ChartData[];
}

export const CusAreaChart: React.FC<CusAreaChartProps> = ({ data }) => {

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='In Progress'
          stackId='1'
          stroke='#8884d8'
          fill='#8884d8'
        />
        <Area
          type='monotone'
          dataKey='Completed'
          stackId='1'
          stroke='#82ca9d'
          fill='#82ca9d'
        />
        <Area
          type='monotone'
          dataKey='Not Started Yet'
          stackId='1'
          stroke='#ffc658'
          fill='#ffc658'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
