import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';


interface ChartData {
    name: string;
    value: number;
}

interface BarChartProps {
    data: ChartData[];
    title: string;
    description: string;
    className?: string;
    barColor?: string;
}

export function SimpleBarChart({ data, title, description, className, barColor = "var(--color-primary)" }: BarChartProps) {
    // Mock data for the Weekly Activity chart
    const MOCK_WEEKLY_ACTIVITY_DATA = [
        { name: 'Mon', value: 30 },
        { name: 'Tue', value: 65 },
        { name: 'Wed', value: 80 },
        { name: 'Thu', value: 25 },
        { name: 'Fri', value: 55 },
        { name: 'Sat', value: 90 },
        { name: 'Sun', value: 30 },
    ];

    // Use data prop if provided, otherwise use mock data (since data is guaranteed to be provided from profile page)
    const chartData = data.length > 0 ? data : MOCK_WEEKLY_ACTIVITY_DATA;

    return (
        <Card className={cn("border-surface-border bg-surface-dark shadow-xl h-full", className)}>
            <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-white text-lg font-bold">{title}</CardTitle>
                <p className="text-gray-400 text-sm">{description}</p>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={barColor} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={barColor} stopOpacity={0.5}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-surface-dark/90 p-3 rounded-lg border border-surface-border shadow-lg backdrop-blur-sm">
                                                <p className="text-primary font-bold text-sm mb-1">{label}</p>
                                                <p className="text-white text-xs">{title}: <span className="font-mono font-bold">{payload[0].value}</span></p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                                wrapperStyle={{ outline: 'none' }}
                            />
                            <Bar dataKey="value" fill="url(#colorBar)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const MOCK_WEEKLY_ACTIVITY_DATA = [
    { name: 'Mon', value: 30 },
    { name: 'Tue', value: 65 },
    { name: 'Wed', value: 80 },
    { name: 'Thu', value: 25 },
    { name: 'Fri', value: 55 },
    { name: 'Sat', value: 90 },
    { name: 'Sun', value: 30 },
];
