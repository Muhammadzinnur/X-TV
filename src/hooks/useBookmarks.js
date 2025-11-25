import { useState, useEffect } from 'react';
import { storageService } from '../utils/localStorage';

export const useBookmarks = () => {
  const [bookmarked, setBookmarked] = useState([]);

  useEffec
    setBookmarked(storageService.getBookmarks());
  }, []);

  const toggleBookmark = (item) => {
    const exists = bookmarked.find(b => b.id === item.id);
    let updated;
    if (exists) {
      updated = bookmarked.filter(b => b.id !== item.id);
    } else {
      updated = [...bookmarked, item];
    }
    setBookmarked(updated);
    storageService.saveBookmarks(updated);
  };t(() => {

  const isBookmarked = (id) => bookmarked.some(b => b.id === id);

  return { bookmarked, toggleBookmark, isBookmarked };
};