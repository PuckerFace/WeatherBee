import type { WeatherData } from '@/api/type';
import { useFavourite } from '@/hooks/useFavourite';
import React from 'react';
import { Button } from './button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface FavouriteButtonProps {
  data: WeatherData; // Replace 'any' with the actual type of data you expect
}

const FavouriteButton = ({ data }: FavouriteButtonProps) => {
  const { addFavourites, isFav, removeFavourite } = useFavourite();
  const isFavourite = isFav(data.coord.lat, data.coord.lon);
  const handleToggleFavourite = () => {
    if (isFavourite) {
      removeFavourite.mutate(`  ${data.coord.lat} - ${data.coord.lon} `);
    } else {
      addFavourites.mutate({
        lat: data.coord.lat,
        lon: data.coord.lon,
        name: data.name,
        country: data.sys.country,
        state: data?.state || '',
      });
    }
  };
  return (
    <Button
      variant={isFavourite ? 'default' : 'outline'}
      size={'icon'}
      className={isFavourite ? 'bg-amber-500 hover:bg-yellow-600 ' : ''}
      onClick={handleToggleFavourite}
    >
      <Star className={`h-4 w-4 ${isFavourite ? 'fiil-current' : ''}`} />
    </Button>
  );
};

export default FavouriteButton;
