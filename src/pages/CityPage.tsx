import CurrentWeather from '@/components/CurrentWeather';
import HourlyTemp from '@/components/HourlyTemp';
import SkeletonComponent from '@/components/Skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import FavouriteButton from '@/components/ui/favourite-button';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherForecast from '@/components/WeatherForecast';

import { useForecastQuery, useWeatherQuery } from '@/hooks/useWeather';
import { ArrowLeft, Terminal } from 'lucide-react';

import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');
  const navigate = useNavigate();
  const coordinates = { lat, lon };
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <Terminal />
        <AlertTitle>Error Fetching Data</AlertTitle>
        <AlertDescription>
          {weatherQuery.error?.message || forecastQuery.error?.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div
        className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
        onClick={() => navigate('/')}
        role="button"
      >
        <ArrowLeft />
        Back
      </div>
      {/* fav cities */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {' '}
          {params.cityName ? params.cityName : 'Weather Information'},{' '}
          {weatherQuery.data?.sys.country}
        </h1>
        <div>
          <FavouriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col  gap-4">
          {weatherQuery.data && <CurrentWeather data={weatherQuery.data} />}
          {forecastQuery.data && <HourlyTemp data={forecastQuery.data} />}
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start ">
          {weatherQuery.data && <WeatherDetails data={weatherQuery.data} />}
          {forecastQuery.data && <WeatherForecast data={forecastQuery.data} />}
        </div>
      </div>
      {/* current weather */}
      {/* Loading */}
      {/* {locationLoading && <SkeletonComponent />} */}
      {/* Error */}
      {/* {locationError && (
          <Alert variant="destructive">
            <Terminal />
            <AlertTitle>Location Error!</AlertTitle>
            <AlertDescription>
              <p>{locationError}</p>
              <p></p>
              <Button
                variant="outline"
                className="mt-2 flex items-center w-fit"
                onClick={getLocation}
              >
                <MapPin className="h-4 w-4 " />
                Enable
              </Button>
            </AlertDescription>
          </Alert>
        )} */}
      {/* 
        {!coordinates && (
          <Alert variant="default">
            <MapPin />
            <AlertTitle>Location Not Found</AlertTitle>
            <AlertDescription>
              Please enable location services to get your current weather.
            </AlertDescription>
          </Alert>
        )} */}
      {/* You can render weather info here if coordinates exist */}
      {/* {coordinates && <WeatherInfo coords={coordinates} />} */}{' '}
      {!weatherQuery.data ||
        !forecastQuery.data ||
        (!params.cityName && <SkeletonComponent />)}
    </div>
  );
};

export default CityPage;
