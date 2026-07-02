import { create } from 'zustand';
import { supabase } from '../supabase';

const useLibraryStore = create((set, get) => ({
  likedTracks: [],
  theme: localStorage.getItem('tala_theme') || 'dark',

  // Load likes from Supabase (called after login)
  loadLikes: async (userId) => {
    try {
      const { data } = await supabase
        .from('likes')
        .select('track_id')
        .eq('user_id', userId);
      if (data) {
        set({ likedTracks: data.map(l => l.track_id) });
      }
    } catch {
      // Fall back to localStorage if offline
      const stored = JSON.parse(localStorage.getItem('tala_liked') || '[]');
      set({ likedTracks: stored });
    }
  },

  toggleLike: async (trackId) => {
    const state = get();
    const user = (await import('../supabase')).supabase.auth.getSession()
      .then(({ data }) => data.session?.user);

    const sessionUser = await user;
    const isLiked = state.likedTracks.includes(trackId);
    const newLiked = isLiked
      ? state.likedTracks.filter(id => id !== trackId)
      : [...state.likedTracks, trackId];

    // Optimistic update
    set({ likedTracks: newLiked });

    // Sync to Supabase
    if (sessionUser) {
      try {
        if (isLiked) {
          await supabase
            .from('likes')
            .delete()
            .eq('user_id', sessionUser.id)
            .eq('track_id', trackId);
        } else {
          await supabase
            .from('likes')
            .insert({ user_id: sessionUser.id, track_id: trackId });
        }
      } catch {
        // Revert on error
        set({ likedTracks: state.likedTracks });
      }
    } else {
      // Fallback to localStorage
      localStorage.setItem('tala_liked', JSON.stringify(newLiked));
    }

    return isLiked;
  },

  setTheme: (theme) => {
    localStorage.setItem('tala_theme', theme);
    set({ theme });
    // Sync theme to profile if logged in
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data.session) {
        supabase.from('profiles').update({ theme }).eq('id', data.session.user.id);
      }
    });
  },

  toggleTheme: () => {
    const state = get();
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    get().setTheme(newTheme);
  },
}));

export default useLibraryStore;
