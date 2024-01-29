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

const data = [
  {
    name: 2017,
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 2018,
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 2019,
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 2020,
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 2021,
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 2022,
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 2023,
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
]

interface LineChartProps {}

export const CusLineChart: FC<LineChartProps> = () => {
  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='pv' stroke='#ffaaaa' />
          <Line type='monotone' dataKey='uv' stroke='#aaffaa' />
          <Line type='monotone' dataKey='amt' stroke='#aaaaff' />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
