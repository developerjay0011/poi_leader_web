import { FC } from 'react'
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'


const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#00FC10',
  '#FF0320',
]

export const CusPieChart: FC<any> = ({ options }) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          data={options}
          cx='50%'
          cy='50%'
          outerRadius='100%'
          fill='#8884d8'
          dataKey='value'>
          {options?.map((entry: any, index: any) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
