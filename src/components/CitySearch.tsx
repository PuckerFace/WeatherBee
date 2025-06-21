import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { Clock, Loader2, Search, XCircle } from 'lucide-react';
import { useSearchLocations } from '@/hooks/useWeather';
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { format } from 'date-fns';

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { data: location, isLoading } = useSearchLocations(query);
  const { searchHistory, clearHistory, addSearchHistory } =
    useSearchHistory(query);
  const navigate = useNavigate();

  const handleSelect = (value: string) => {
    const [lat, lon, name, country] = value.split('|');
    // Here you can handle the selected city, e.g., update state or navigate
    // console.log(`Selected City: ${name}, Country: ${country}, Lat: ${lat}, Lon: ${lon}`);
    // navigate(`/city/${name}/${country}/${lat}/${lon}`, {
    //   replace: true,
    // });
    addSearchHistory.mutate({
      query,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name,
      country,
    });
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    setOpen(false);
  };
  //   console.log(location);

  return (
    <>
      <Button
        className="w-full flex justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        variant={'outline'}
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search Cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Cities..."
          value={query}
          onValueChange={(value) => setQuery(value)}
          autoFocus
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>Hmmm..... does this city exist?</CommandEmpty>
          )}
          {/*   */}
          {/* <CommandGroup heading="Favourites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup> */}

          {searchHistory.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 mt-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant={'ghost'}
                    size="sm"
                    className="my-2 text-center flex items-center justify-center "
                  >
                    <XCircle
                      className="h-4 w-4 "
                      onClick={() => clearHistory.mutate()}
                    />
                    Clear
                  </Button>
                </div>
                {searchHistory.map((item) => (
                  <CommandItem
                    key={`${item.lat}-${item.lon}`}
                    value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                    onSelect={handleSelect}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{item.name}</span>
                    {item.state && (
                      <span className="text-sm text-muted-foreground">
                        {item.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {item.country}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {format(item.searchTime, 'MMM d, h:mm a')}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
          <CommandSeparator />
          {location && location.length > 0 && (
            <CommandGroup heading="Suggested Cities">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="animate-spin h-4 w-4 " />
                </div>
              )}
              {location.map((item) => {
                return (
                  <CommandItem
                    key={`${item.lat} - ${item.lon}`}
                    value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                    {item.state && (
                      <span className="text-sm text-muted-foreground">
                        {item.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {item.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
