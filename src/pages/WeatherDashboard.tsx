import SkeletonComponent from '@/components/Skeleton';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, RefreshCcw, Terminal } from 'lucide-react';
import React from 'react';
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from '@/hooks/useWeather';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyTemp from '@/components/HourlyTemp';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherForecast from '@/components/WeatherForecast';

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  // console.log('coordinates', coordinates);

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  console.log(weatherQuery.data);

  // console.log(locationQuery);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
      // Fetch weather data using coordinates
      // Example: fetchWeatherData(coordinates.lat, coordinates.lon);
    }
    // if (locationLoading) {
    //   return <SkeletonComponent />;
    // }
    // if (locationError) {
    //   return (
    //     <Alert variant="destructive">
    //       <Terminal />
    //       <AlertTitle>Location Error!</AlertTitle>
    //       <AlertDescription>
    //         <p>{locationError}</p>
    //         <Button
    //           variant="outline"
    //           className="mt-2 flex items-center justify-between w-fit"
    //           onClick={getLocation}
    //         >
    //           <MapPin className="h-4 w-4 mr-2" />
    //           Retry
    //         </Button>
    //       </AlertDescription>
    //     </Alert>
    //   );
    // }
  };

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error || locationQuery.error) {
    return (
      <Alert variant="destructive">
        <Terminal />
        <AlertTitle>Error Fetching Data</AlertTitle>
        <AlertDescription>
          {weatherQuery.error?.message ||
            forecastQuery.error?.message ||
            locationQuery.error?.message}
        </AlertDescription>
        <Button
          variant="outline"
          className="mt-2 flex items-center w-fit"
          onClick={handleRefresh}
        >
          <RefreshCcw className="h-4 w-4 " />
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* fav cities */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={'outline'}
          className="mb-4"
          size={'icon'}
          onClick={handleRefresh}
          disabled={
            weatherQuery.isFetching ||
            forecastQuery.isFetching ||
            locationQuery.isFetching
          }
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? 'animate-spin' : ''
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {weatherQuery.data && (
            <CurrentWeather
              data={weatherQuery.data}
              locationName={locationName}
            />
          )}
          {forecastQuery.data && <HourlyTemp data={forecastQuery.data} />}
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {weatherQuery.data && <WeatherDetails data={weatherQuery.data} />}
          {forecastQuery.data && <WeatherForecast data={forecastQuery.data} />}
        </div>
      </div>
      {/* current weather */}
      {/* Loading */}
      {locationLoading && <SkeletonComponent />}

      {/* Error */}
      {locationError && (
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
      )}

      {!coordinates && (
        <Alert variant="default">
          <MapPin />
          <AlertTitle>Location Not Found</AlertTitle>
          <AlertDescription>
            Please enable location services to get your current weather.
          </AlertDescription>
        </Alert>
      )}
      {!weatherQuery.data && !forecastQuery.data && !locationQuery.data && (
        <SkeletonComponent />
      )}

      {/* You can render weather info here if coordinates exist */}
      {/* {coordinates && <WeatherInfo coords={coordinates} />} */}
    </div>
  );
};

export default WeatherDashboard;
