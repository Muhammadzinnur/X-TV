export const storageService = {
  getBookmarks: () => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  },

  saveBookmarks: (bookmarks) => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
};
