import React from 'react';
import { MediaGrid } from '../components/MediaGrid';

export const SearchPage = ({ searchQuery, searchResults, isBookmarked, onToggleBookmark }) => {
  return (
    <div>
      <h2 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
        Found {searchResults.length} results {searchQuery && `for "${searchQuery}"`}
      </h2>
      <MediaGrid
        items={searchResults}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
};