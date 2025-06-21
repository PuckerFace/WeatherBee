import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useLocalStorage from './useLocalStorage';

interface searchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchTime: number;
}

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useLocalStorage<
    searchHistoryItem[]
  >('searchHistory', []);
  const queryClient = useQueryClient();
  const historyQuery = useQuery({
    queryKey: ['searchHistory'],
    queryFn: () => searchHistory,
    initialData: searchHistory,
  });
  const addSearchHistory = useMutation({
    mutationFn: async (
      search: Omit<searchHistoryItem, 'id' | 'searchTime'>
    ) => {
      const newItem: searchHistoryItem = {
        ...search,
        id: `${search.lat} - ${search.lon} - ${Date.now()} `,
        searchTime: Date.now(),
      };
      const filteredHistory = searchHistory.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon)
      );

      const updatedHistory = [newItem, ...filteredHistory].slice(0, 10); // Keep only the last 10 items
      setSearchHistory(updatedHistory);

      return newItem;
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(['searchHistory'], newItem);
    },
  });
  const clearHistory = useMutation({
    mutationFn: async () => {
      setSearchHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(['searchHistory'], []);
    },
  });
  return {
    searchHistory: historyQuery.data || [],
    addSearchHistory,
    clearHistory,
  };
}
