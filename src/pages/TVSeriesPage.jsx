import React from 'react';
import { MediaGrid } from '../components/MediaGrid';

export const TVSeriesPage = ({ tvSeries, isBookmarked, onToggleBookmark }) => {
  return (
    <div>
      <h2 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">TV Series</h2>
      <MediaGrid
        items={tvSeries}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
};