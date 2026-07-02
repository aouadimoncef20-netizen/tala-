import { create } from 'zustand';
import { supabase } from '../supabase';

const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  profile: null,

  // Initialize — check for existing session
  init: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        set({ user: session.user, session, loading: false });
        await get().loadProfile();
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }

    // Listen for auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        set({ user: session.user, session });
        await get().loadProfile();
      } else {
        set({ user: null, session: null, profile: null });
      }
    });
  },

  // Load user profile
  loadProfile: async () => {
    const user = get().user;
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (data) set({ profile: data });
  },

  // Sign in with email/password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  // Sign up with email/password
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null });
  },

  // Update profile
  updateProfile: async (updates) => {
    const user = get().user;
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    if (data) set({ profile: data });
    if (error) throw error;
  },
}));

export default useAuthStore;
