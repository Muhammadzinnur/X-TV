import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-1 transition-all duration-500 hover:scale-105 group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-500 rounded-full ${
        isDark 
          ? 'from-blue-500/20 to-purple-500/20 opacity-100' 
          : 'from-yellow-500/20 to-orange-500/20 opacity-100'
      }`} />

      {/* Sliding circle */}
      <div className={`relative z-10 w-6 h-6 rounded-full shadow-lg transition-all duration-500 ease-out flex items-center justify-center ${
        isDark 
          ? 'translate-x-0 bg-gradient-to-br from-blue-400 to-purple-500' 
          : 'translate-x-8 bg-gradient-to-br from-yellow-400 to-orange-500'
      }`}>
        {isDark ? (
          <Moon size={14} className="text-white animate-spin-slow" style={{ animationDuration: '3s' }} />
        ) : (
          <Sun size={14} className="text-white animate-spin-slow" style={{ animationDuration: '3s' }} />
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Moon size={12} className={`transition-all duration-500 ${
          isDark ? 'text-blue-300 opacity-100' : 'text-gray-500 opacity-30'
        }`} />
        <Sun size={12} className={`transition-all duration-500 ${
          !isDark ? 'text-orange-300 opacity-100' : 'text-gray-500 opacity-30'
        }`} />
      </div>
    </button>
  );
};