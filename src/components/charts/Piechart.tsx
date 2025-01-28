import {
    PieChart,
    Pie,
    Legend,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts'
import { ChartData } from '../leader/pages/AnalyticsPage';

// Define the colors you provided for the Areas
const COLORS = [
    '#8884d8',  // In Progress
    '#82ca9d',  // Completed
    '#ffc658',  // Not Started Yet
]

interface CusPieChartProps {
    data: ChartData[];
}

export const CusPieChart: React.FC<CusPieChartProps> = ({ data }) => {
    let aggregateData = {
        'In Progress': 0,
        'Completed': 0,
        'Not Started Yet': 0,
    };
    data.forEach(entry => {
        aggregateData['In Progress'] += entry['In Progress'];
        aggregateData['Completed'] += entry['Completed'];
        aggregateData['Not Started Yet'] += entry['Not Started Yet'];
    });
    const pieChartData = [
        { name: 'In Progress', value: aggregateData['In Progress'] },
        { name: 'Completed', value: aggregateData['Completed'] },
        { name: 'Not Started Yet', value: aggregateData['Not Started Yet'] }
    ];


    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
                <Pie
                    data={pieChartData}  // Use the dynamic data passed as a prop
                    cx='50%'
                    cy='50%'
                    outerRadius='100%'
                    fill='#8884d8'
                    dataKey='value'
                >
                    {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}
