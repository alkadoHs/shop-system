import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

interface SalesProfitChartProps {
  salesData: number[];
  profitData: number[];
  months: string[];
}

const SalesProfitChart: React.FC<SalesProfitChartProps> = ({ salesData, profitData, months }) => {
  // Prepare the chart data
  const chartData = months.map((month, index) => ({
    month,
    sales: salesData[index],
    profit: profitData[index],
  }));

  const chartConfig = {
    sales: {
      label: 'Sales',
      color: 'hsl(var(--chart-1))',
    },
    profit: {
      label: 'Profit',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales vs Profit (Last 6 Months)</CardTitle>
        <CardDescription>Comparison of total sales and profit over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
            <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesProfitChart;
