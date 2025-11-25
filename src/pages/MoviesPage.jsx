import React from 'react';
import { MediaGrid } from '../components/MediaGrid';

export const MoviesPage = ({ movies, isBookmarked, onToggleBookmark }) => {
  return (
    <div>
      <h2 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Movies</h2>
      <MediaGrid
        items={movies}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
};