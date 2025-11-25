import React from 'react';
import { TrendingSection } from '../components/TrendingSection';
import { MediaGrid } from '../components/MediaGrid';

export const HomePage = ({ trending, recommended, isBookmarked, onToggleBookmark }) => {
  return (
    <div>
      <TrendingSection
        items={trending}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
      />

      <div>
        <h2 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recommended for you</h2>
        <MediaGrid
          items={recommended}
          isBookmarked={isBookmarked}
          onToggleBookmark={onToggleBookmark}
        />
      </div>
    </div>
  );
};