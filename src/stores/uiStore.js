import { create } from 'zustand';

const useUIStore = create((set) => ({
  activeView: 'home',
  searchQuery: '',
  selectedArtist: null,
  selectedAlbum: null,
  selectedPodcast: null,
  showPremium: false,
  sleepTimer: null,
  sleepOptions: false,
  toasts: [],

  setActiveView: (view) => set({ activeView: view }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedArtist: (id) => set({ selectedArtist: id, activeView: 'artist' }),
  setSelectedAlbum: (id) => set({ selectedAlbum: id, activeView: 'album' }),
  setShowPremium: (show) => set({ showPremium: show }),

  // Navigate home and reset selections
  goHome: () => set({ activeView: 'home', selectedArtist: null, selectedAlbum: null }),

  // Search handler: set query and switch view
  handleSearch: (q) => set(state => ({
    searchQuery: q,
    activeView: q.trim() ? 'search' : 'home',
  })),

  setSleepTimer: (seconds) => set({ sleepTimer: seconds }),
  cancelSleepTimer: () => set({ sleepTimer: null, sleepOptions: false }),
  setSleepOptions: (show) => set({ sleepOptions: show }),
  toggleSleepOptions: () => set(state => ({ sleepOptions: !state.sleepOptions })),

  addToast: (toast) => set(state => ({ toasts: [...state.toasts, toast] })),
  removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}));

export default useUIStore;
