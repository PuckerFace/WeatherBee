import type { WeatherData } from '@/api/type';

import React from 'react';
import { format } from 'date-fns';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: 'Sunrise',
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      colour: 'text-amber-400',
    },
    {
      title: 'Sunset',
      value: formatTime(sys.sunset),
      icon: Sunset,
      colour: 'text-blue-400',
    },
    {
      title: 'Wind Direction',
      value: `${getWindDirection(wind.deg)} ${wind.deg}°`,
      icon: Compass,
      colour: 'text-yellow-800',
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      colour: 'text-gray-500',
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid gap-6 sm:grid-cols-2 ">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center border rounded p-4 gap-2 mb-4"
            >
              <detail.icon className={`h-6 w-6 ${detail.colour}`} />
              <div>
                <h3 className="text-sm font-semibold leading-none">
                  {detail.title}
                </h3>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
