import React from 'react';
import usePlayerStore from '../stores/playerStore';
import './MiniPlayer.css';

const MiniPlayer = ({ visible }) => {
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const togglePlay = usePlayerStore(s => s.togglePlay);
  const setShowFullPlayer = usePlayerStore(s => s.setShowFullPlayer);

  if (!currentTrack || !visible) return null;

  return (
    <div className="miniplayer" onClick={() => setShowFullPlayer(true)}>
      <img
        className={`miniplayer__art ${isPlaying ? 'miniplayer__art--spin' : ''}`}
        src={currentTrack.image}
        alt={currentTrack.title}
      />
      <div className="miniplayer__info">
        <div className="miniplayer__title">{currentTrack.title}</div>
        <div className="miniplayer__artist">{currentTrack.podcastName || currentTrack.artist}</div>
      </div>
      <button
        className="miniplayer__play"
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
        )}
      </button>
    </div>
  );
};

export default MiniPlayer;
