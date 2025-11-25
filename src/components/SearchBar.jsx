import React from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
    if (value.trim()) {
      navigate('/search');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="mb-6">
      <div className="relative group">
        <div className="max-w-md flex items-center gap-4 pb-3 border-b-2  border-transparent transition-all duration-300 hover:border-gray-600">
          <Search className={`transition-all duration-300 ${
            searchQuery ? 'text-green-500 scale-110' : 'text-gray-400 group-hover:text-gray-300'
          }`} size={22} />

          <input
            type="text"
            placeholder="Search for movies or TV series"
            value={searchQuery}
            onChange={handleChange}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base md:text-lg font-light"
          />

          {searchQuery && (
            <button
              onClick={handleClear}
              className="p-1.5 hover:bg-white/10 rounded-full transition-all duration-200 hover:rotate-90"
            >
              <X className="text-gray-400 hover:text-white transition-colors" size={18} />
            </button>
          )}
        </div>

        <div className={`max-w-md absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-green-500 via-red-400 to-green-500 transition-all duration-500 ease-out ${
          searchQuery ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`} />
      </div>
    </div>
  );
};