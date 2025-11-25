import { BASE_URL, API_KEY } from '../config/api';

export const tmdbService = {
  fetchTrending: async () => {
    try {
      const res = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
      const data = await res.json();
      return data.results?.slice(0, 5) || [];
    } catch (err) {
      console.error('Error fetching trending:', err);
      return [];
    }
  },

  fetchMovies: async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error('Error fetching movies:', err);
      return [];
    }
  },

  fetchTvSeries: async () => {
    try {
      const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error('Error fetching TV series:', err);
      return [];
    }
  },

  fetchRecommended: async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
      const data = await res.json();
      return data.results?.slice(0, 8) || [];
    } catch (err) {
      console.error('Error fetching recommended:', err);
      return [];
    }
  },

  searchContent: async (query) => {
    if (!query.trim()) return [];
    try {
      const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error('Error searching:', err);
      return [];
    }
  },

  fetchDetails: async (type, id) => {
    try {
      const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Error fetching details:', err);
      return null;
    }
  }
};