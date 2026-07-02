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
    isCollaborative: false,
    contributors: ['Youcef'],
    activityLog: [],
  };
  save([...list, newList]);
  return newList;
};

export const deletePlaylist = (id) => {
  save(load().filter(p => p.id !== id));
};

export const addTrackToPlaylist = (playlistId, track, user = 'Youcef') => {
  const list = load();
  const updated = list.map(p => {
    if (p.id !== playlistId) return p;
    if (p.tracks.some(t => t.id === track.id)) return p;
    const newTracks = [...p.tracks, track];
    const newLog = [...(p.activityLog || []), {
      user,
      action: 'added',
      trackName: track.title,
      timestamp: new Date().toISOString(),
    }];
    // Add user to contributors if not already
    const contributors = p.contributors || [];
    if (!contributors.includes(user)) {
      contributors.push(user);
    }
    return { ...p, tracks: newTracks, activityLog: newLog, contributors };
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

export const toggleCollaborative = (playlistId) => {
  const list = load();
  const updated = list.map(p => {
    if (p.id !== playlistId) return p;
    return { ...p, isCollaborative: !p.isCollaborative };
  });
  save(updated);
  return updated.find(p => p.id === playlistId);
};

export const getPlaylistShareCode = (playlistId) => {
  return `tala://playlist/${playlistId}`;
};
