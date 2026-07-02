import React, { memo, useRef } from 'react';
import useSwipe from '../hooks/useSwipe';
import { fmt } from '../utils';
import usePlayerStore from '../stores/playerStore';
import useUIStore from '../stores/uiStore';
import useLibraryStore from '../stores/libraryStore';
import { createToast } from './Toast';
import './PlayerBar.css';

const PlayerBar = memo(() => {
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const isSimulated = usePlayerStore(s => s.isSimulated);
  const playbackSpeed = usePlayerStore(s => s.playbackSpeed);
  const volume = usePlayerStore(s => s.volume);
  const isMuted = usePlayerStore(s => s.isMuted);
  const isRadioMode = usePlayerStore(s => s.isRadioMode);
  const togglePlay = usePlayerStore(s => s.togglePlay);
  const skipTime = usePlayerStore(s => s.skipTime);
  const seek = usePlayerStore(s => s.seek);
  const setSpeed = usePlayerStore(s => s.setSpeed);
  const setShowFullPlayer = usePlayerStore(s => s.setShowFullPlayer);
  const toggleMute = usePlayerStore(s => s.toggleMute);

  const sleepTimer = useUIStore(s => s.sleepTimer);
  const addToast = useUIStore(s => s.addToast);

  const likedTracks = useLibraryStore(s => s.likedTracks);
  const toggleLike = useLibraryStore(s => s.toggleLike);

  const isRadio = currentTrack?.type === 'radio';

  // Compute display values from store
  const state = usePlayerStore.getState();
  const displayTime = isSimulated ? state.simulatedTime : state.currentTime;
  const totalDuration = (() => {
    if (!currentTrack?.duration) return 1200;
    if (currentTrack.duration === 'Live') return 3600;
    const parts = currentTrack.duration.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 1200;
  })();
  const dur = isRadio ? 3600 : totalDuration;
  const progressPct = dur > 0 ? (displayTime / dur) * 100 : 0;

  const isLiked = currentTrack ? likedTracks.includes(currentTrack.id) : false;

  const barRef = useRef(null);
  const playerRef = useRef(null);

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => skipTime(30),
    onSwipeRight: () => skipTime(-15),
    onSwipeUp: () => setShowFullPlayer(true),
    thresholdX: 50,
    thresholdY: 30,
  });

  const handleBar = (e) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      seek(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
    }
  };

  const handleToggleLike = () => {
    if (!currentTrack) return;
    const wasLiked = toggleLike(currentTrack.id);
    addToast(createToast(
      wasLiked ? 'removed' : 'liked',
      wasLiked ? 'Removed from likes' : 'Liked ♥',
      ''
    ));
  };

  const cycleSpeed = () => {
    setSpeed(playbackSpeed >= 2 ? 0.5 : +(playbackSpeed + 0.25).toFixed(2));
  };

  if (!currentTrack) {
    return (
      <div className="player">
        <div className="player__idle">
          <span className="player__idle-icon">◌</span>
          <span>Select a track to play</span>
        </div>
      </div>
    );
  }

  return (
    <div className="player" ref={playerRef} style={{ touchAction: 'none' }} {...swipeHandlers}>
      {/* Progress bar (top edge) */}
      <div className="player__progress-edge" ref={barRef} onClick={handleBar}>
        <div className="player__progress-edge-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="player__body">
        {/* Left: Track */}
        <div className="player__left" onClick={() => setShowFullPlayer(true)} style={{ cursor: 'pointer' }} aria-label="Open full player" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowFullPlayer(true); } }}>
          <img className={`player__img ${isPlaying ? 'player__img--spin' : ''}`} src={currentTrack.image} alt={currentTrack.title} />
          <div className="player__info">
            <div className="player__title">{currentTrack.title}</div>
            <div className="player__artist">
              {currentTrack.podcastName || currentTrack.artist}
              {isRadio && <span className="player__live">LIVE</span>}
              {isRadioMode && <span className="player__radio-badge">🎵 Radio</span>}
            </div>
          </div>
          <button className="player__btn" onClick={handleToggleLike} title={isLiked ? 'Unlike' : 'Like'} aria-label={isLiked ? 'Unlike' : 'Like'}>{isLiked ? '♥' : '♡'}</button>
        </div>

        {/* Center: Controls */}
        <div className="player__center">
          <div className="player__controls">
            <button className="player__ctrl" onClick={cycleSpeed} title="Playback speed" aria-label={`Speed ${playbackSpeed}x`}>
              <span className="player__speed">{playbackSpeed}x</span>
            </button>
            <button className="player__ctrl" onClick={() => skipTime(-15)} title="Skip back 15s" aria-label="Skip back 15 seconds">
              <svg viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="currentColor"/></svg>
            </button>
            <button className="player__play" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
              )}
            </button>
            <button className="player__ctrl" onClick={() => skipTime(30)} title="Skip forward 30s" aria-label="Skip forward 30 seconds">
              <svg viewBox="0 0 24 24"><path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z" fill="currentColor"/></svg>
            </button>
            <button className="player__ctrl" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'} aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted || volume === 0 ? '🔇' : volume < 40 ? '🔉' : '🔊'}
            </button>
          </div>
          <div className="player__time-row">
            <span className="player__time">{fmt(displayTime)}</span>
            <span className="player__time">{isRadio ? 'LIVE' : fmt(dur)}</span>
          </div>
        </div>

        {/* Right: Sleep timer + Volume */}
        <div className="player__right">
          {sleepTimer && <span className="player__sleep-badge" title="Sleep timer active">⏰ {Math.floor(sleepTimer / 60)}m</span>}
          <div className="player__volume-wrap">
            <div className="player__volume-bar">
              <div className="player__volume-fill" style={{ width: `${isMuted ? 0 : volume}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PlayerBar;
