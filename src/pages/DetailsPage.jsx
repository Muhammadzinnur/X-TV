import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Bookmark, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { tmdbService } from '../services/tmdbService';
import { BACKDROP_BASE_URL, IMAGE_BASE_URL } from '../config/api';
import { CastCard } from '../components/CastCard';
import { MediaGrid } from '../components/MediaGrid';

export const DetailsPage = ({ isBookmarked, onToggleBookmark }) => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDetails();
  }, [type, id]);

  const loadDetails = async () => {
    setLoading(true);
    const data = await tmdbService.fetchDetails(type, id);
    setDetails(data);
    setLoading(false);
  };

  const scrollCarousel = (direction, containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#10141E]">
        <div className="text-white text-lg sm:text-xl">Loading...</div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#10141E]">
        <div className="text-white text-lg sm:text-xl">Content not found</div>
      </div>
    );
  }

  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const runtime = details.runtime || details.episode_run_time?.[0];
  const trailer = details.videos?.results?.find(v => v.type === 'Trailer');

  return (
    <div className="min-h-screen bg-[#10141E] md:ps-14">
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[75vh]">
        <div className="absolute inset-0">
          <img
            src={details.backdrop_path ? `${BACKDROP_BASE_URL}${details.backdrop_path}` : 'https://via.placeholder.com/1920x1080?text=No+Image'}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10141E] via-[#10141E]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10141E]/50 to-transparent" />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 md:left-12 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-2 sm:p-3 rounded-full transition"
        >
          <ArrowLeft className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:pl-24 lg:p-12">
          <div className="max-w-5xl">
            <h1 className="text-white text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg">{title}</h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/90 mb-3 sm:mb-4">
              {details.vote_average > 0 && (
                <span className="flex items-center gap-1 bg-yellow-500/30 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg">
                  <Star size={14} className="sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{details.vote_average.toFixed(1)}</span>
                </span>
              )}
              {releaseDate && (
                <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg">
                  <Calendar size={14} className="sm:w-4 sm:h-4" />
                  {new Date(releaseDate).getFullYear()}
                </span>
              )}
              {runtime && (
                <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg">
                  <Clock size={14} className="sm:w-4 sm:h-4" />
                  {runtime} min
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {details.genres?.slice(0, 4).map(genre => (
                <span key={genre.id} className="bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm text-white font-medium">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {trailer && (
                <button
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                  className="bg-white hover:bg-white/90 text-black px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 font-semibold text-sm sm:text-base transition shadow-lg"
                >
                  <Play size={18} className="sm:w-5 sm:h-5 fill-black" />
                  Watch Trailer
                </button>
              )}
              <button
                onClick={() => onToggleBookmark({...details, id: details.id, media_type: type})}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 transition"
              >
                <Bookmark size={18} className={`sm:w-5 sm:h-5 ${isBookmarked(details.id) ? 'fill-white' : ''}`} />
                <span className="hidden sm:inline">{isBookmarked(details.id) ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:pl-24 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Overview</h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl">{details.overview}</p>
          </div>

          {details.credits?.cast?.length > 0 && (
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-white text-xl sm:text-2xl font-bold">Cast</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollCarousel('left', 'cast-carousel')}
                    className="hidden sm:flex bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                  >
                    <ChevronLeft className="text-white w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right', 'cast-carousel')}
                    className="hidden sm:flex bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                  >
                    <ChevronRight className="text-white w-5 h-5" />
                  </button>
                </div>
              </div>
              <div
                id="cast-carousel"
                className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {details.credits.cast.slice(0, 20).map(person => (
                  <CastCard key={person.id} person={person} />
                ))}
              </div>
            </div>
          )}

          {details.credits?.crew?.filter(p => ['Director', 'Writer', 'Producer', 'Screenplay'].includes(p.job)).length > 0 && (
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-white text-xl sm:text-2xl font-bold">Crew</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollCarousel('left', 'crew-carousel')}
                    className="hidden sm:flex bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                  >
                    <ChevronLeft className="text-white w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right', 'crew-carousel')}
                    className="hidden sm:flex bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                  >
                    <ChevronRight className="text-white w-5 h-5" />
                  </button>
                </div>
              </div>
              <div
                id="crew-carousel"
                className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {details.credits.crew
                  .filter(p => ['Director', 'Writer', 'Producer', 'Screenplay'].includes(p.job))
                  .slice(0, 15)
                  .map((person, idx) => (
                    <CastCard key={`${person.id}-${idx}`} person={person} />
                  ))}
              </div>
            </div>
          )}

          {details.similar?.results?.length > 0 && (
            <div className="mb-8 sm:mb-12">
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">More Like This</h2>
              <MediaGrid
                items={details.similar.results.slice(0, 12).map(item => ({...item, media_type: type}))}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};