import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

interface SalesExpenseChartProps {
  salesData: number[];
  expensesData: number[];
  months: string[];
}

const SalesExpenseChart: React.FC<SalesExpenseChartProps> = ({ salesData, expensesData, months }) => {
  // Prepare the chart data
  const chartData = months?.map((month, index) => ({
    month,
    sales: salesData[index],
    expenses: expensesData[index],
  }));

  const chartConfig = {
    sales: {
      label: 'Sales',
      color: 'hsl(var(--chart-1))',
    },
    expenses: {
      label: 'Expenses',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales vs Expenses (Last 6 Months)</CardTitle>
        <CardDescription>Comparison of total sales and expenses over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesExpenseChart;
