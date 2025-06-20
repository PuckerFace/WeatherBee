import type { Coordinates } from '@/api/type';
import { weatherAPI } from '@/api/weather';
import { useQuery } from '@tanstack/react-query';

export const WEATHER_QUERY_KEY = {
  weather: (coordinates: Coordinates | null) =>
    ['weather', coordinates] as const,
  forecast: (coordinates: Coordinates) => ['forecast', coordinates] as const,
  location: (coordinates: Coordinates) => ['location', coordinates] as const,
};

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_QUERY_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates, // Only run the query if coordinates are provided
  });
}
export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_QUERY_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates, // Only run the query if coordinates are provided
  });
}
export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_QUERY_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates, // Only run the query if coordinates are provided
  });
}
