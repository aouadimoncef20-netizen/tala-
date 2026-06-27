const STORAGE_KEY = 'tala_playlists';

const load = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
};

const save = (playlists) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  } catch {}
};

export const getPlaylists = () => load();

export const createPlaylist = (name) => {
  const list = load();
  const newList = {
    id: `pl-${Date.now()}`,
    name,
    tracks: [],
    createdAt: new Date().toISOString(),
  };
  save([...list, newList]);
  return newList;
};

export const deletePlaylist = (id) => {
  save(load().filter(p => p.id !== id));
};

export const addTrackToPlaylist = (playlistId, track) => {
  const list = load();
  const updated = list.map(p => {
    if (p.id !== playlistId) return p;
    if (p.tracks.some(t => t.id === track.id)) return p;
    return { ...p, tracks: [...p.tracks, track] };
  });
  save(updated);
};

export const removeTrackFromPlaylist = (playlistId, trackId) => {
  const list = load();
  const updated = list.map(p => {
    if (p.id !== playlistId) return p;
    return { ...p, tracks: p.tracks.filter(t => t.id !== trackId) };
  });
  save(updated);
};

export const renamePlaylist = (id, name) => {
  const list = load();
  save(list.map(p => p.id === id ? { ...p, name } : p));
};
