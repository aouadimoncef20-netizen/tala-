import { create } from 'zustand';

const useLibraryStore = create((set, get) => ({
  // State
  likedTracks: JSON.parse(localStorage.getItem('tala_liked') || '[]'),
  theme: localStorage.getItem('tala_theme') || 'dark',

  // Actions
  toggleLike: (trackId) => {
    const state = get();
    const isLiked = state.likedTracks.includes(trackId);
    const newLiked = isLiked
      ? state.likedTracks.filter(id => id !== trackId)
      : [...state.likedTracks, trackId];
    localStorage.setItem('tala_liked', JSON.stringify(newLiked));
    set({ likedTracks: newLiked });
    return isLiked; // returns true if was liked (now removed), false if was not liked (now added)
  },

  setTheme: (theme) => {
    localStorage.setItem('tala_theme', theme);
    set({ theme });
  },

  toggleTheme: () => {
    const state = get();
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('tala_theme', newTheme);
    set({ theme: newTheme });
  },
}));

export default useLibraryStore;
