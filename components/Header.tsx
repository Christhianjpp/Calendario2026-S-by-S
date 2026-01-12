
import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="sticky top-0 z-50 bg-bgLight/80 dark:bg-bgDark/80 backdrop-blur-md border-b border-primary/5 dark:border-white/5 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-2xl font-serif font-bold text-primary dark:text-accent tracking-tight transition-transform group-hover:scale-105">
            Planificador<span className="font-light italic">Mensual</span>
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-white/5 text-primary dark:text-accent transition-colors"
          >
            <span className="material-icons">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Header;
