import type { WeatherData } from '@/api/type';
import { useFavourite } from '@/hooks/useFavourite';
import React from 'react';
import { Button } from './button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface FavouriteButtonProps {
  data: WeatherData; // Replace 'any' with the actual type of data you expect
}

// const FavouriteButton = ({ data }: FavouriteButtonProps) => {
//   const { addFavourites, isFav, removeFavourite } = useFavourite();
//   //   const isFavourite = isFav(data.coord?.lat, data.coord?.lon);
//   //   const handleToggleFavourite = () => {
//   //     if (isFavourite) {
//   //       removeFavourite.mutate(`  ${data.coord.lat} - ${data.coord.lon} `);
//   //       toast.error(`Removed ${data.name} from favourites`);
//   //     } else {
//   //       addFavourites.mutate({
//   //         lat: data.coord.lat,
//   //         lon: data.coord.lon,
//   //         name: data.name,
//   //         country: data.sys.country,
//   //       });
//   //       toast.success(`Added ${data.name} to favourites`);
//   //     }
//   //   };
//   if (!data || !data.coord) return null;
//   const isFavourite = `${data.coord.lat}-${data.coord.lon}`;

//   const handleToggleFavourite = () => {
//     if (isFav(data.coord.lat, data.coord.lon)) {
//       removeFavourite.mutate(isFavourite);
//       toast.error(`Removed ${data.name} from favourites`);
//     } else {
//       addFavourites.mutate({
//         lat: data.coord.lat,
//         lon: data.coord.lon,
//         name: data.name,
//         country: data.sys.country,
//       });
//       toast.success(`Added ${data.name} to favourites`);
//     }
//   };

//   return (
//     <Button
//       variant={isFav(data.coord.lat, data.coord.lon) ? 'default' : 'outline'}
//       size="icon"
//       className={
//         isFav(data.coord.lat, data.coord.lon)
//           ? 'bg-amber-500 hover:bg-yellow-600'
//           : 'bg-muted-foreground hover:bg-muted'
//       }
//       onClick={handleToggleFavourite}
//     >
//       <Star
//         className={`h-4 w-4 ${
//           isFav(data.coord.lat, data.coord.lon) ? 'fill-current text-white' : ''
//         }`}
//       />
//     </Button>
//   );
// };

// export default FavouriteButton;

const FavouriteButton = ({ data }: FavouriteButtonProps) => {
  const { addFavourites, removeFavourite, isFav } = useFavourite(); // ✅ Hook is always called

  if (!data?.coord) return null;

  const key = `${data.coord.lat}-${data.coord.lon}`;
  const isFavourite = isFav(data.coord.lat, data.coord.lon);

  const handleToggleFavourite = () => {
    if (isFavourite) {
      removeFavourite.mutate(key);
      toast.error(`Removed ${data.name} from favourites`);
    } else {
      addFavourites.mutate({
        lat: data.coord.lat,
        lon: data.coord.lon,
        name: data.name,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favourites`);
    }
  };

  return (
    <Button
      variant={isFavourite ? 'default' : 'outline'}
      size="icon"
      className={
        isFavourite
          ? 'bg-amber-500 hover:bg-yellow-600'
          : 'bg-muted-foreground hover:bg-muted'
      }
      onClick={handleToggleFavourite}
    >
      <Star
        className={`h-4 w-4 ${isFavourite ? 'fill-current text-white' : ''}`}
      />
    </Button>
  );
};

export default FavouriteButton;
