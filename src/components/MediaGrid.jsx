import React from 'react';
import { MediaCard } from './MediaCard';

export const MediaGrid = ({ items, isBookmarked, onToggleBookmark, columns = 4 }) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3 sm:gap-4`}>
      {items.map(item => (
        <MediaCard
          key={item.id}
          item={item}
          isBookmarked={isBookmarked}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};