import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useLocalStorage from './useLocalStorage';

interface FavouriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addTime: number;
}

export function useFavourite() {
  const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>(
    'favourites',
    []
  );
  const queryClient = useQueryClient();
  const favouritesQuery = useQuery({
    queryKey: ['favourites'],
    queryFn: () => favourites,
    initialData: favourites,
    staleTime: Infinity,
  });
  const addFavourites = useMutation({
    mutationFn: async (fav: Omit<FavouriteCity, 'id' | 'addTime'>) => {
      const newFavourite: FavouriteCity = {
        ...fav,
        id: `${fav.lat} - ${fav.lon} - ${Date.now()} `,
        addTime: Date.now(),
      };
      const exists = favourites.some((fav) => fav.id === newFavourite.id);
      if (exists) {
        return newFavourite;
      }

      const updatedFavourite = [...favourites, newFavourite].slice(0, 10); // Keep only the last 10 items
      setFavourites(updatedFavourite);

      return newFavourite;
    },
    onSuccess: (newFav) => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    },
  });
  const removeFavourite = useMutation({
    mutationFn: async (cityId: string) => {
      const updatedFavourites = favourites.filter((fav) => fav.id !== cityId);
      setFavourites(updatedFavourites);
      return updatedFavourites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    },
  });
  return {
    favourites: favouritesQuery.data || [],
    addFavourites,
    removeFavourite,
    isFav: (lat: number, lon: number) => {
      return favourites.some((fav) => fav.lat === lat && fav.lon === lon);
    },
  };
}
