import React from 'react';
import { IMAGE_BASE_URL } from '../config/api';
import { User } from 'lucide-react';

export const CastCard = ({ person }) => {
  return (
    <div className="flex-shrink-0 w-32 sm:w-40 lg:w-44 group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden mb-2 bg-gray-800 shadow-lg transform transition-transform group-hover:scale-105">
        {person.profile_path ? (
          <img
            src={`${IMAGE_BASE_URL}${person.profile_path}`}
            alt={person.name}
            className="w-full h-44 sm:h-52 lg:h-56 object-cover"
          />
        ) : (
          <div className="w-full h-44 sm:h-52 lg:h-56 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <User size={48} className="text-gray-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-white text-sm sm:text-base font-semibold line-clamp-2 mb-1">{person.name}</h3>
      <p className="text-gray-400 text-xs sm:text-sm line-clamp-1">{person.character || person.job}</p>
    </div>
  );
};
