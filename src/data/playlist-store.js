import { supabase } from '../supabase';

// ============================================================
// Playlist store — syncs to Supabase when logged in,
// falls back to localStorage when offline/not logged in
// ============================================================

const STORAGE_KEY = 'tala_playlists';

const loadLocal = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
};

const saveLocal = (playlists) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists)); } catch {}
};

// Get current user ID
const getUserId = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id || null;
};

export const getPlaylists = async () => {
  const userId = await getUserId();
  if (userId) {
    const { data } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (data) return data.map(p => ({
      id: p.id,
      name: p.name,
      tracks: p.tracks || [],
      createdAt: p.created_at,
      isCollaborative: p.is_collaborative,
      activityLog: p.activity_log || [],
    }));
  }
  return loadLocal();
};

export const createPlaylist = async (name) => {
  const userId = await getUserId();
  const newPlaylist = {
    id: userId ? crypto.randomUUID() : `pl-${Date.now()}`,
    name,
    tracks: [],
    createdAt: new Date().toISOString(),
    isCollaborative: false,
    activityLog: [],
  };

  if (userId) {
    const { data, error } = await supabase
      .from('playlists')
      .insert({
        id: newPlaylist.id,
        user_id: userId,
        name,
        tracks: [],
        is_collaborative: false,
        activity_log: [],
      })
      .select()
      .single();
    if (!error && data) {
      return {
        id: data.id,
        name: data.name,
        tracks: data.tracks || [],
        createdAt: data.created_at,
        isCollaborative: data.is_collaborative,
        activityLog: data.activity_log || [],
      };
    }
  }

  // Fallback: localStorage
  const list = loadLocal();
  saveLocal([...list, newPlaylist]);
  return newPlaylist;
};

export const deletePlaylist = async (id) => {
  const userId = await getUserId();
  if (userId) {
    await supabase.from('playlists').delete().eq('id', id).eq('user_id', userId);
  }
  saveLocal(loadLocal().filter(p => p.id !== id));
};

export const addTrackToPlaylist = async (playlistId, track, user = 'Youcef') => {
  const userId = await getUserId();
  if (userId) {
    const { data: playlist } = await supabase
      .from('playlists')
      .select('tracks, activity_log')
      .eq('id', playlistId)
      .single();

    if (playlist) {
      const tracks = playlist.tracks || [];
      if (tracks.some(t => t.id === track.id)) return;

      const newTracks = [...tracks, track];
      const newLog = [...(playlist.activity_log || []), {
        user, action: 'added', trackName: track.title, timestamp: new Date().toISOString(),
      }];

      await supabase
        .from('playlists')
        .update({ tracks: newTracks, activity_log: newLog, updated_at: new Date().toISOString() })
        .eq('id', playlistId);
    }
    return;
  }

  // Fallback
  const list = loadLocal();
  saveLocal(list.map(p => {
    if (p.id !== playlistId) return p;
    if (p.tracks.some(t => t.id === track.id)) return p;
    return { ...p, tracks: [...p.tracks, track] };
  }));
};

export const removeTrackFromPlaylist = async (playlistId, trackId) => {
  const userId = await getUserId();
  if (userId) {
    const { data: playlist } = await supabase
      .from('playlists')
      .select('tracks')
      .eq('id', playlistId)
      .single();
    if (playlist) {
      await supabase
        .from('playlists')
        .update({
          tracks: (playlist.tracks || []).filter(t => t.id !== trackId),
          updated_at: new Date().toISOString(),
        })
        .eq('id', playlistId);
    }
    return;
  }

  // Fallback
  saveLocal(loadLocal().map(p => {
    if (p.id !== playlistId) return p;
    return { ...p, tracks: p.tracks.filter(t => t.id !== trackId) };
  }));
};

export const renamePlaylist = async (id, name) => {
  const userId = await getUserId();
  if (userId) {
    await supabase.from('playlists').update({ name, updated_at: new Date().toISOString() }).eq('id', id);
    return;
  }
  saveLocal(loadLocal().map(p => p.id === id ? { ...p, name } : p));
};

export const toggleCollaborative = async (playlistId) => {
  const userId = await getUserId();
  if (userId) {
    const { data: playlist } = await supabase.from('playlists').select('is_collaborative').eq('id', playlistId).single();
    if (playlist) {
      await supabase.from('playlists').update({
        is_collaborative: !playlist.is_collaborative,
        updated_at: new Date().toISOString(),
      }).eq('id', playlistId);
    }
    return;
  }
  const list = loadLocal();
  saveLocal(list.map(p => {
    if (p.id !== playlistId) return p;
    return { ...p, isCollaborative: !p.isCollaborative };
  }));
};

export const getPlaylistShareCode = (playlistId) => `tala://playlist/${playlistId}`;
