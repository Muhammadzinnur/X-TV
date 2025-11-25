import React from 'react';
import { MediaGrid } from '../components/MediaGrid';

export const BookmarkedPage = ({ bookmarked, isBookmarked, onToggleBookmark }) => {
  const movies = bookmarked.filter(i => i.media_type === 'movie');
  const tvShows = bookmarked.filter(i => i.media_type === 'tv');

  return (
    <div>
      <h2 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Bookmarked</h2>
      {bookmarked.length === 0 ? (
        <p className="text-gray-400 text-sm sm:text-base">No bookmarked items yet</p>
      ) : (
        <>
          {movies.length > 0 && (
            <>
              <h3 className="text-white text-base sm:text-lg font-medium mb-3 mt-4 sm:mt-6">Bookmarked Movies</h3>
              <MediaGrid
                items={movies}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
              />
            </>
          )}

          {tvShows.length > 0 && (
            <>
              <h3 className="text-white text-base sm:text-lg font-medium mb-3 mt-4 sm:mt-6">Bookmarked TV Series</h3>
              <MediaGrid
                items={tvShows}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};