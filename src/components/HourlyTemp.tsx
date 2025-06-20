import React from 'react';
import type { ForecastData } from '@/api/type';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { format } from 'date-fns';

interface HourlyTempProps {
  data: ForecastData;
}

const HourlyTemp = ({ data }: HourlyTempProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), 'ha'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="w-full h-[200px]">
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#808080"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#808080"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°C`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const { time, temp, feels_like } = payload[0].payload;
                    return (
                      <div className="bg-background p-2 rounded shadow-lg">
                        <p className="font-bold">{time}</p>
                        <p>Temp: {temp}°C</p>
                        <p>Feels Like: {feels_like}°C</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#FFAA1D"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#8A9A5B"
                dot={false}
                strokeDasharray=" 5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemp;
