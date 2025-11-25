import React from 'react';
import { TrendingUp } from 'lucide-react';
import { MediaCard } from './MediaCard';

export const TrendingSection = ({ items, isBookmarked, onToggleBookmark }) => {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
        <TrendingUp size={20} className="sm:w-6 sm:h-6" />
        Trending
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {items.map(item => (
          <MediaCard
            key={item.id}
            item={item}
            size="large"
            isBookmarked={isBookmarked}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </div>
  );
};