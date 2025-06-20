export interface Coordinates {
  lat: number;
  lon: number;
}
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  // clouds: {
  //     all: number;
  // };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: WeatherData['main'];
    weather: WeatherData['weather'];
    wind: WeatherData['wind'];
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface GeocodingResponse {
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
}

export interface Geolocationstate {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
  // isError: boolean;
  // refetch: () => void;
}
