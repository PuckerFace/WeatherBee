import type { ForecastData } from '@/api/type';
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Droplets, Wind } from 'lucide-react';

interface WeatherForecastProps {
  data: ForecastData;
}
interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  humidity: number;
  wind: number;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  // const dailyForecast = data.list.slice(0, 7).map((item) => ({
  //     date: new Date(item.dt * 1000).toLocaleDateString(),
  //     temp: Math.round(item.main.temp),
  //     weather: item.weather[0].description,
  // }));
  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        weather: forecast.weather[0],
        date: forecast.dt,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  //   const nextSevenDays = Object.keys(dailyForecast).slice(1, 8);
  const allDays = Object.keys(dailyForecast).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const nextSevenDays = allDays.slice(1, Math.min(8, allDays.length));

  return (
    <Card className="shadow-lg  ">
      <CardHeader>
        <CardTitle>5 Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div>
          <div className="grid    gap-4">
            {nextSevenDays.map((date) => {
              const forecast = dailyForecast[date];
              return (
                <div
                  key={forecast.date}
                  className="  border p-4 rounded-lg  shadow"
                >
                  <div className="grid lg:grid-cols-3 gap-6 justify-between    items-center mb-2 p-4 ">
                    <div className="flex flex-col  justify-center">
                      <h3 className="text-lg  font-semibold">
                        {format(new Date(forecast.date * 1000), 'EEE, MMM d')}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {forecast.weather.description}
                      </p>
                    </div>

                    <div className=" flex  justify-center gap-2 ">
                      {' '}
                      <p className="text-sm  text-muted-foreground">
                        <span className="text-sky-400">Min:</span>{' '}
                        {Math.round(forecast.temp_max)}°C |{' '}
                        <span className="text-red-400">Max:</span>{' '}
                        {Math.round(forecast.temp_min)}°C
                      </p>
                    </div>
                    <div className="flex  justify-center   gap-2 ">
                      <div className="flex items-center gap-2 ">
                        <Droplets className="h-6 w-6 text-blue-500 inline-block" />
                        <p>{Math.round(forecast.wind)}%</p>
                      </div>

                      <div className="flex items-center gap-2 ">
                        <Wind className="h-6 w-6 text-gray-500 inline-block" />
                        <p>{Math.round(forecast.wind)}m/s</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
