import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './context/theme-provider';
import { ModeToggle } from './Theme-toggle';
import CitySearch from './CitySearch';

const Header = () => {
  //   const { theme, setTheme } = useTheme();
  //   const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background p-6 shadow-md supports-[backdrop-filter]:bg-background/40 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <h1>WeatherBee</h1>
        </Link>
        <div className="flex items-center gap-4">
          {/* search */}
          <CitySearch />

          {/* theme */}
          {/* <div
            className={`cursor-pointer transition-transform duration-500 ease-in-out ${
              isDark ? 'rotate-180' : 'rotate-0'
            }`}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-gray-500 rotate-0 transition-all " />
            )}
          </div> */}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
