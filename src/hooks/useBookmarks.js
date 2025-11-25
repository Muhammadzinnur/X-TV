import { useState, useEffect } from 'react';
import { storageService } from '../utils/localStorage';

export const useBookmarks = () => {
  const [bookmarked, setBookmarked] = useState([]);

  useEffect(() => {
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
  };

  const isBookmarked = (id) => bookmarked.some(b => b.id === id);

  return { bookmarked, toggleBookmark, isBookmarked };
};
