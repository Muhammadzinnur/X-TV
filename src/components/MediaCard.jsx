import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Play, Info, Star, Film, Tv } from 'lucide-react';
import { IMAGE_BASE_URL } from '../config/api';
                           
export const MediaCard = ({ item, size = 'normal', isBookmarked, onToggleBookmark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const title = item.title || item.name;
  const isLarge = size === 'large';
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

  const handleClick = () => {
    navigate(`/details/${mediaType}/${item.id}`);
  };

  return (
    <div
      className={`relative group cursor-pointer rounded-lg overflow-hidden ${isLarge ? 'h-40 sm:h-48' : 'h-32 sm:h-36'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img
        src={item.backdrop_path ? `${IMAGE_BASE_URL}${item.backdrop_path}` : 'https://via.placeholder.com/500x281?text=No+Image'}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {isHovered && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3">
          <button className="bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full transition">
            <Play size={16} className="sm:w-5 sm:h-5 text-black fill-black" />
          </button>
          <button className="bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition">
            <Info size={16} className="sm:w-5 sm:h-5 text-white" />
          </button>
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleBookmark({...item, media_type: mediaType});
        }}
        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-1.5 sm:p-2 rounded-full transition z-10"
      >
        <Bookmark
          size={14}
          className={`sm:w-4 sm:h-4 ${isBookmarked(item.id) ? 'fill-white text-white' : 'text-white'}`}
        />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/80 mb-1">
          <span>{item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || 'N/A'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            {mediaType === 'movie' ? <Film size={10} className="sm:w-3 sm:h-3" /> : <Tv size={10} className="sm:w-3 sm:h-3" />}
            {mediaType === 'movie' ? 'Movie' : 'TV'}
          </span>
          {item.vote_average > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star size={10} className="sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                {item.vote_average.toFixed(1)}
              </span>
            </>
          )}
        </div>
        <h3 className="text-white font-semibold text-xs sm:text-sm line-clamp-1">{title}</h3>
      </div>
    </div>
  );
};