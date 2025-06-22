import type { GeocodingResponse, WeatherData } from '@/api/type';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Droplets, Wind } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const tempFormat = (temp: number) => `${Math.round(temp)}°C`;

  return (
    <Card className="overflow-hidden shadow-lg border border-amber-400 ">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-center flex-col gap-4">
                <div className=" flex  items-center gap-2 ">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {locationName?.name || data.name},
                  </h2>
                  {locationName?.state && (
                    <span className=" text-base   text-muted-foreground">
                      {locationName.state}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className=" text-sm text-muted-foreground">
                    {locationName?.country || data.sys.country}
                  </span>
                </div>
                <div className="flex lg:flex-row flex-col items-center gap-4">
                  <p className="text-7xl  font-bold tracking-tighter">
                    {tempFormat(temp)}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Feels like: {tempFormat(feels_like)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-sky-400">Min:</span>{' '}
                      {tempFormat(temp_min)} |{' '}
                      <span className="text-red-400">Max:</span>{' '}
                      {tempFormat(temp_max)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 flex items-center justify-between gap-4 mt-6 lg:mt-4">
                <div className="flex flex-col gap-4 lg:hidden">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-6 w-6 text-blue-500 inline-block" />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Humidity</p>
                      <p className="text-sm text-muted-foreground">
                        {humidity}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-6 w-6 text-gray-500 inline-block" />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Wind Speed</p>
                      <p className="text-sm text-muted-foreground">
                        {speed}m/s
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:hidden flex ">
                  <div
                    className="relative flex items-center justify-center aspect-square w-full max-w-[200px] "
                    // className="flex items-center justify-center aspect-square w-full max-w-[200px] "
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                      alt={
                        currentWeather.description.charAt(0).toUpperCase() +
                        currentWeather.description.slice(1)
                      }
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute bottom-0 text-center">
                      <p className="text-sm font-medium">
                        {/* {currentWeather.description.charAt(0).toUpperCase() +
                  currentWeather.description.slice(1)} */}
                        {currentWeather.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{' '}
          <div className="lg:flex hidden items-center justify-center flex-col">
            <div
              className="relative flex items-center justify-center aspect-square w-full max-w-[200px] "
              // className="flex items-center justify-center aspect-square w-full max-w-[200px] "
            >
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={
                  currentWeather.description.charAt(0).toUpperCase() +
                  currentWeather.description.slice(1)
                }
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium">
                  {/* {currentWeather.description.charAt(0).toUpperCase() +
                  currentWeather.description.slice(1)} */}
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
