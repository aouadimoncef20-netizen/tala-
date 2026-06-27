import React, { useRef } from 'react';
import './FullPlayer.css';

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const FullPlayer = ({
  currentTrack, isPlaying, onTogglePlay, onSkipBack, onSkipForward,
  progress, onSeek, currentTime, duration, isRadio,
  playbackSpeed, onChangeSpeed, isLiked, onToggleLike,
  volume, onSetVolume, isMuted, onToggleMute,
  onClose, queue, onRemoveFromQueue, onPlayItem,
  sleepTimer, sleepOptions, onSleepStart, onSleepCancel, onToggleSleepOptions,
}) => {
  const barRef = useRef(null);

  if (!currentTrack) return null;

  const handleBar = (e) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      onSeek(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
    }
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div className="fullplayer">
      <div className="fullplayer__backdrop" onClick={onClose} />
      <div className="fullplayer__panel">
        {/* Close */}
        <button className="fullplayer__close" onClick={onClose}>
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>

        <div className="fullplayer__body">
          {/* Art */}
          <div className="fullplayer__art-wrap">
            <img
              className={`fullplayer__art ${isPlaying ? 'fullplayer__art--spin' : ''}`}
              src={currentTrack.image}
              alt={currentTrack.title}
            />
          </div>

          {/* Info */}
          <div className="fullplayer__info">
            <h2 className="fullplayer__title">{currentTrack.title}</h2>
            <p className="fullplayer__artist">{currentTrack.podcastName || currentTrack.artist}</p>
          </div>

          {/* Progress */}
          <div className="fullplayer__progress-wrap">
            <div className="fullplayer__progress-bar" ref={barRef} onClick={handleBar}>
              <div className="fullplayer__progress-fill" style={{ width: `${progress}%` }}>
                <div className="fullplayer__progress-thumb" />
              </div>
            </div>
            <div className="fullplayer__time-row">
              <span>{fmt(currentTime)}</span>
              <span>{isRadio ? 'LIVE' : fmt(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="fullplayer__controls">
            <button className="fullplayer__ctrl" onClick={() => {
              const idx = speeds.indexOf(playbackSpeed);
              onChangeSpeed(speeds[(idx + 1) % speeds.length]);
            }}>
              <span className="fullplayer__speed">{playbackSpeed}x</span>
            </button>
            <button className="fullplayer__ctrl" onClick={onSkipBack}>
              <svg viewBox="0 0 24 24"><path d="M11 10V6l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="currentColor"/></svg>
              <span className="fullplayer__skip-label">15</span>
            </button>
            <button className="fullplayer__play" onClick={onTogglePlay}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
              )}
            </button>
            <button className="fullplayer__ctrl" onClick={onSkipForward}>
              <svg viewBox="0 0 24 24"><path d="M13 10V6l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z" fill="currentColor"/></svg>
              <span className="fullplayer__skip-label">30</span>
            </button>
            <button className={`fullplayer__ctrl ${isLiked ? 'fullplayer__ctrl--active' : ''}`} onClick={onToggleLike}>
              {isLiked ? '♥' : '♡'}
            </button>
          </div>

          {/* Volume + Sleep Timer */}
          <div className="fullplayer__extras">
            <div className="fullplayer__vol">
              <button className="fullplayer__mini-btn" onClick={onToggleMute}>
                {isMuted || volume === 0 ? '🔇' : volume < 40 ? '🔉' : '🔊'}
              </button>
              <div className="fullplayer__vol-bar">
                <div className="fullplayer__vol-fill" style={{ width: `${isMuted ? 0 : volume}%` }} />
              </div>
            </div>
            <div className="fullplayer__sleep">
              <button className="fullplayer__mini-btn" onClick={onToggleSleepOptions} title="Sleep Timer">
                {sleepTimer ? `⏰ ${Math.floor(sleepTimer / 60)}m` : '⏱'}
              </button>
              {sleepOptions && (
                <div className="fullplayer__sleep-menu">
                  <span className="fullplayer__sleep-title">Sleep Timer</span>
                  {[15, 30, 45, 60].map(m => (
                    <button key={m} className="fullplayer__sleep-opt" onClick={() => onSleepStart(m)}>{m} min</button>
                  ))}
                  {sleepTimer && <button className="fullplayer__sleep-opt fullplayer__sleep-opt--cancel" onClick={onSleepCancel}>Cancel</button>}
                  <button className="fullplayer__sleep-opt fullplayer__sleep-opt--cancel" onClick={onToggleSleepOptions}>Close</button>
                </div>
              )}
            </div>
          </div>

          {/* Queue */}
          {queue.length > 0 && (
            <div className="fullplayer__queue">
              <span className="fullplayer__queue-title">Up next ({queue.length})</span>
              <div className="fullplayer__queue-list">
                {queue.map((item, i) => (
                  <div key={`q-${i}`} className="fullplayer__queue-item">
                    <img className="fullplayer__queue-img" src={item.image} alt="" />
                    <div className="fullplayer__queue-info">
                      <span className="fullplayer__queue-name">{item.title}</span>
                      <span className="fullplayer__queue-artist">{item.podcastName || item.artist}</span>
                    </div>
                    <button className="fullplayer__queue-del" onClick={() => onRemoveFromQueue?.(i)}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullPlayer;
