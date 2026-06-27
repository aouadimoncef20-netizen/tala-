import React, { useRef } from 'react';
import './PlayerBar.css';

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const PlayerBar = ({ currentTrack, isPlaying, onTogglePlay, onSkipBack, onSkipForward, progress, onSeek, currentTime, duration, isRadio, playbackSpeed, onChangeSpeed, isLiked, onToggleLike, volume, onSetVolume, isMuted, onToggleMute, onExpand, sleepTimer }) => {
  const barRef = useRef(null);

  const handleBar = (e) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      onSeek(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
    }
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
    <div className="player">
      {/* Progress bar (top edge) */}
      <div className="player__progress-edge" ref={barRef} onClick={handleBar}>
        <div className="player__progress-edge-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="player__body">
        {/* Left: Track */}
        <div className="player__left" onClick={onExpand} style={{ cursor: 'pointer' }}>
          <img className="player__img" src={currentTrack.image} alt={currentTrack.title} />
          <div className="player__info">
            <div className="player__title">{currentTrack.title}</div>
            <div className="player__artist">
              {currentTrack.podcastName || currentTrack.artist}
              {isRadio && <span className="player__live">LIVE</span>}
            </div>
          </div>
          <button className="player__btn" onClick={onToggleLike}>{isLiked ? '♥' : '♡'}</button>
        </div>

        {/* Center: Controls */}
        <div className="player__center">
          <div className="player__controls">
            <button className="player__ctrl" onClick={() => onChangeSpeed(playbackSpeed >= 2 ? 0.5 : +(playbackSpeed + 0.25).toFixed(2))}>
              <span className="player__speed">{playbackSpeed}x</span>
            </button>
            <button className="player__ctrl" onClick={onSkipBack}>
              <svg viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="currentColor"/></svg>
            </button>
            <button className="player__play" onClick={onTogglePlay}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
              )}
            </button>
            <button className="player__ctrl" onClick={onSkipForward}>
              <svg viewBox="0 0 24 24"><path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z" fill="currentColor"/></svg>
            </button>
            <button className="player__ctrl" onClick={onToggleMute}>
              {isMuted || volume === 0 ? '🔇' : volume < 40 ? '🔉' : '🔊'}
            </button>
          </div>
          <div className="player__time-row">
            <span className="player__time">{fmt(currentTime)}</span>
            <span className="player__time">{isRadio ? 'LIVE' : fmt(duration)}</span>
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
};

export default PlayerBar;
