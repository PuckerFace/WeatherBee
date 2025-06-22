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

// export function useFavourite() {
//   const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>(
//     'favourites',
//     []
//   );
//   const queryClient = useQueryClient();
//   const favouritesQuery = useQuery({
//     queryKey: ['favourites'],
//     queryFn: () => favourites,
//     initialData: favourites,
//     staleTime: Infinity,
//   });
//   const addFavourites = useMutation({
//     mutationFn: async (fav: Omit<FavouriteCity, 'id' | 'addTime'>) => {
//       const newFavourite: FavouriteCity = {
//         ...fav,
//         id: `${fav.lat} - ${fav.lon} `,
//         addTime: Date.now(),
//       };
//       const exists = favourites.some((fav) => fav.id === newFavourite.id);
//       if (exists) {
//         return newFavourite;
//       }

//       const updatedFavourite = [...favourites, newFavourite].slice(0, 10); // Keep only the last 10 items
//       setFavourites(updatedFavourite);

//       return newFavourite;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['favourites'] });
//     },
//   });
//   const removeFavourite = useMutation({
//     mutationFn: async (cityId: string) => {
//       const updatedFavourites = favourites.filter((fav) => fav.id !== cityId);
//       setFavourites(updatedFavourites);
//       return updatedFavourites;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['favourites'] });
//     },
//   });
//   return {
//     favourites: favouritesQuery.data || [],
//     addFavourites,
//     removeFavourite,
//     isFav: (lat: number, lon: number) => {
//       return favourites.some((fav) => fav.lat === lat && fav.lon === lon);
//     },
//   };
// }

// export function useFavourite() {
//   const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>(
//     'favourites',
//     []
//   );
//   const queryClient = useQueryClient();

//   const favouritesQuery = useQuery({
//     queryKey: ['favourites'],
//     queryFn: () => {
//       const stored = localStorage.getItem('favourites');
//       return stored ? JSON.parse(stored) : [];
//     },
//     initialData: favourites,
//     staleTime: Infinity,
//   });

//   const addFavourites = useMutation({
//     mutationFn: async (fav: Omit<FavouriteCity, 'id' | 'addTime'>) => {
//       const newFavourite: FavouriteCity = {
//         ...fav,
//         id: `${fav.lat}-${fav.lon}`,
//         addTime: Date.now(),
//       };

//       const exists = favourites.some((fav) => fav.id === newFavourite.id);
//       if (exists) return newFavourite;

//       const updatedFavourite = [...favourites, newFavourite].slice(0, 10);
//       setFavourites(updatedFavourite);
//       return newFavourite;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['favourites'] });
//     },
//   });

//   const removeFavourite = useMutation({
//     mutationFn: async (cityId: string) => {
//       const updatedFavourites = favourites.filter((fav) => fav.id === cityId);
//       setFavourites(updatedFavourites);
//       return updatedFavourites;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['favourites'] });
//     },
//   });

//   return {
//     favourites: favouritesQuery.data || [],
//     addFavourites,
//     removeFavourite,
//     isFav: (lat: number, lon: number) => {
//       return favouritesQuery.data?.some(
//         (fav) => fav.lat === lat && fav.lon === lon
//       );
//     },
//   };
// }

export function useFavourite() {
  const [local, setLocal] = useLocalStorage<FavouriteCity[]>('favourites', []);
  const queryClient = useQueryClient();

  const favouritesQuery = useQuery<FavouriteCity[]>({
    queryKey: ['favourites'],
    queryFn: () => local,
    initialData: local,
    staleTime: Infinity,
  });

  const addFavourites = useMutation<
    FavouriteCity,
    unknown,
    Omit<FavouriteCity, 'id' | 'addTime'>
  >({
    mutationFn: async (fav) => {
      const newFav: FavouriteCity = {
        ...fav,
        id: `${fav.lat}-${fav.lon}`,
        addTime: Date.now(),
      };

      const current = favouritesQuery.data || [];
      const exists = current.some((f) => f.id === newFav.id);
      if (exists) return newFav;

      const updated = [...current, newFav].slice(0, 10);
      setLocal(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(['favourites'], updated);
    },
  });

  const removeFavourite = useMutation<FavouriteCity[], unknown, string>({
    mutationFn: async (id) => {
      const current = favouritesQuery.data || [];
      const updated = current.filter((fav) => fav.id !== id);
      setLocal(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(['favourites'], updated);
    },
  });

  return {
    favourites: favouritesQuery.data || [],
    addFavourites,
    removeFavourite,
    isFav: (lat: number, lon: number) => {
      const list = favouritesQuery.data || [];
      return list.some((fav) => fav.lat === lat && fav.lon === lon);
    },
  };
}
