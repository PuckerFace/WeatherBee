import { Link } from 'react-router-dom';
import bee from '../assets/bee.svg';
import { ModeToggle } from './Theme-toggle';
import CitySearch from './CitySearch';

const Header = () => {
  //   const { theme, setTheme } = useTheme();
  //   const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background p-6 shadow-md supports-[backdrop-filter]:bg-background/40 backdrop-blur  border-amber-400">
      <div className="container mx-auto flex  items-center justify-between">
        <Link to="/" className="flex gap-1">
          <img src={bee} alt="" width={24} height={24} />
          <h1>
            Weather
            <span className="text-yellow-400">B</span>
            ee
          </h1>
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
