import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { API_KEY } from './config/api';
import { tmdbService } from './services/tmdbService';
import { useBookmarks } from './hooks/useBookmarks';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { TVSeriesPage } from './pages/TVSeriesPage';
import { BookmarkedPage } from './pages/BookmarkedPage';
import { SearchPage } from './pages/SearchPage';
import { DetailsPage } from './pages/DetailsPage';

const AppContent = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const { bookmarked, toggleBookmark, isBookmarked } = useBookmarks();
  const isDetailsPage = location.pathname.includes('/details/');

  useEffect(() => {
    if (!API_KEY) {
      alert('Iltimos, TMDb API kalitingizni kiriting! \n\n1. https://www.themoviedb.org/ saytiga ro\'yxatdan o\'ting\n2. Settings > API bo\'limidan API kalitni oling\n3. src/config/api.js faylida API_KEY o\'zgaruvchisiga joylashtiring');
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    const [trendingData, moviesData, tvData, recommendedData] = await Promise.all([
      tmdbService.fetchTrending(),
      tmdbService.fetchMovies(),
      tmdbService.fetchTvSeries(),
      tmdbService.fetchRecommended()
    ]);

    setTrending(trendingData);
    setMovies(moviesData.map(m => ({ ...m, media_type: 'movie' })));
    setTvSeries(tvData.map(t => ({ ...t, media_type: 'tv' })));
    setRecommended(recommendedData.map(r => ({ ...r, media_type: 'movie' })));
  };

  const handleSearch = async (query) => {
    const results = await tmdbService.searchContent(query);
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-[#10141E] flex flex-col md:flex-row">
      <Sidebar />

      <div className={`flex-1 ${isDetailsPage ? '' : 'md:ml-20'} ${isDetailsPage ? '' : 'pb-20 md:pb-0'}`}>
        {!isDetailsPage && (
          <div className="p-4 sm:p-6 md:pl-0 lg:pl-6">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>
        )}

        <div className={isDetailsPage ? '' : 'px-4 sm:px-6 md:pl-0 lg:pl-6'}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  trending={trending}
                  recommended={recommended}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <MoviesPage
                  movies={movies}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
            <Route
              path="/tv"
              element={
                <TVSeriesPage
                  tvSeries={tvSeries}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
            <Route
              path="/bookmarked"
              element={
                <BookmarkedPage
                  bookmarked={bookmarked}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
            <Route
              path="/search"
              element={
                <SearchPage
                  searchQuery={searchQuery}
                  searchResults={searchResults}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
            <Route
              path="/details/:type/:id"
              element={
                <DetailsPage
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;