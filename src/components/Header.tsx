import React from 'react';
import { Link } from 'react-router-dom';

import { ModeToggle } from './Theme-toggle';
import CitySearch from './CitySearch';

const Header = () => {
  //   const { theme, setTheme } = useTheme();
  //   const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background p-6 shadow-md supports-[backdrop-filter]:bg-background/40 backdrop-blur  border-amber-400">
      <div className="container mx-auto flex  items-center justify-between">
        <Link to="/">
          <h1>WeatherBee</h1>
        </Link>
        <div className="flex items-center gap-2 lg:gap-4">
          {/* search */}
          <CitySearch />

          {/* theme */}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
