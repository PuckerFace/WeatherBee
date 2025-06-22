import { useFavourite } from '@/hooks/useFavourite';
import React, { use } from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useWeatherQuery } from '@/hooks/useWeather';
import { Button } from './ui/button';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

interface FavouriteCityCardProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavouriteCities = () => {
  const { favourites, removeFavourite } = useFavourite();
  if (favourites.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No favourite cities added yet.
      </div>
    );
  }
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight">Favourites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favourites.map((city) => (
            <FavouriteCityCard
              key={city.id}
              {...city}
              onRemove={() => removeFavourite.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
};
function FavouriteCityCard({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavouriteCityCardProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      tabIndex={0}
      className=" relative min-w-[250px] flex flex-col items-center gap-3 p-4 pr-8 rounded-lg border bg-card hover:shadow-md shadow-sm transition-all cursor-pointer  "
    >
      <Button
        className="absolute top-1 h-6 w-6 right-1 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from favourites`);
        }}
      >
        <X className="h-4 w-4 " />
      </Button>
      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2 mt-3 justify-between w-full ">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-8 w-8 object-contain"
            />

            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-lg font-bold">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-sm capitalize text-muted-foreground">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FavouriteCities;
