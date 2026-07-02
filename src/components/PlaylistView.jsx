import React, { useState, useEffect } from 'react';
import { getPlaylists, createPlaylist, deletePlaylist, removeTrackFromPlaylist } from '../data/playlist-store';
import AIPlaylistGenerator from './AIPlaylistGenerator';
import usePlayerStore from '../stores/playerStore';
import useUIStore from '../stores/uiStore';
import { createToast } from './Toast';
import './PlaylistView.css';

const PlaylistView = () => {
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const playOrToggle = usePlayerStore(s => s.playOrToggle);
  const addToast = useUIStore(s => s.addToast);
  const [playlists, setPlaylists] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const refresh = () => setPlaylists([...getPlaylists()]);
  useEffect(() => { refresh(); }, []);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    setNewName('');
    setShowCreate(false);
    refresh();
  };

  const handleDelete = (id) => {
    deletePlaylist(id);
    if (selectedId === id) setSelectedId(null);
    refresh();
  };

  const selected = playlists.find(p => p.id === selectedId);

  return (
    <div className="pl-view">
      <div className="section__head" style={{ marginTop: 16 }}>
        <span className="section__title">Playlists</span>
        <div className="section__head-actions">
          <button className="section__more section__more--ai" onClick={() => setShowAI(!showAI)}>
            {showAI ? '✕ Close' : 'Generate with AI ✨'}
          </button>
          <button className="section__more" onClick={() => setShowCreate(true)}>+ New</button>
        </div>
      </div>

      {/* AI Playlist Generator */}
      {showAI && (
        <AIPlaylistGenerator onPlay={playOrToggle} onToast={(type, title, msg) => addToast(createToast(type, title, msg))} />
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="pl-modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="pl-modal" onClick={e => e.stopPropagation()}>
            <h3 className="pl-modal__title">Create Playlist</h3>
            <input
              className="pl-modal__input"
              placeholder="Playlist name..."
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
            <div className="pl-modal__actions">
              <button className="pl-modal__btn pl-modal__btn--cancel" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="pl-modal__btn pl-modal__btn--create" onClick={handleCreate} disabled={!newName.trim()}>Create</button>
            </div>
          </div>
        </div>
      )}

      {playlists.length === 0 ? (
        <div className="empty-state" style={{ padding: '60px 20px' }}>
          <div className="empty-state__icon">🎵</div>
          <div className="empty-state__text">No playlists yet</div>
          <div className="empty-state__sub">Create your first playlist to save tracks</div>
        </div>
      ) : selected ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <button className="section__more" onClick={() => setSelectedId(null)}>← Back</button>
            <span className="section__title" style={{ fontSize: 18 }}>{selected.name}</span>
            <span className="section__count">{selected.tracks.length} tracks</span>
            <button className="section__more" style={{ marginLeft: 'auto', color: 'var(--accent)' }} onClick={() => handleDelete(selected.id)}>Delete</button>
          </div>
          {selected.tracks.length === 0 ? (
            <div className="empty-state" style={{ padding: 40 }}>
              <div className="empty-state__text">No tracks in this playlist</div>
            </div>
          ) : (
            <div className="track-list">
              {selected.tracks.map((track, i) => (
                <div key={track.id} className={`track-row ${currentTrack?.id === track.id && isPlaying ? 'track-row--active' : ''}`} onClick={() => playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId })}>
                  <span className="track-row__num">{i + 1}</span>
                  <div className="track-row__info">
                    <div className="track-row__title">{track.title}</div>
                    <div className="track-row__artist">{track.artist}</div>
                  </div>
                  <span className="track-row__duration">{track.duration}</span>
                  <div className="track-row__actions">
                    <button className="track-row__action" onClick={(e) => { e.stopPropagation(); removeTrackFromPlaylist(selected.id, track.id); refresh(); }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="pl-grid">
          {playlists.map(p => (
            <div key={p.id} className="pl-card" onClick={() => setSelectedId(p.id)}>
              <div className="pl-card__art">
                <span>🎵</span>
              </div>
              <div className="pl-card__body">
                <span className="pl-card__name">{p.name}</span>
                <span className="pl-card__count">{p.tracks.length} tracks</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistView;
