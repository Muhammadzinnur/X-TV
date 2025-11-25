import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Tv, Bookmark } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { id: '/', icon: Home, label: 'Home' },
    { id: '/movies', icon: Film, label: 'Movies' },
    { id: '/tv', icon: Tv, label: 'TV Series' },
    { id: '/bookmarked', icon: Bookmark, label: 'Bookmarked' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="hidden md:flex w-20 bg-[#161D2F] flex-col items-center py-6 gap-8 fixed left-0 top-0 bottom-0 z-50">
        <Link to="/" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
          <Film className="text-white" size={20} />
        </Link>

        <nav className="flex flex-col gap-6 flex-1">
          {navItems.map(({ id, icon: Icon }) => (
            <Link
              key={id}
              to={id}
              className={`p-3 rounded-lg transition-all relative group ${
                isActive(id) 
                  ? 'text-white bg-white/10' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-white/5'
              }`}
            >
              <Icon size={24} />
              {isActive(id) && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#161D2F] z-50 border-t border-white/5">
        <nav className="flex justify-around items-center py-3">
          {navItems.map(({ id, icon: Icon, label }) => (
            <Link
              key={id}
              to={id}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive(id) 
                  ? 'text-white bg-white/10' 
                  : 'text-gray-400'
              }`}
            >
              <Icon size={20} />
              <span className={`text-xs font-medium ${isActive(id) ? 'text-white' : 'text-gray-500'}`}>
                {label}
              </span>
              {isActive(id) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
