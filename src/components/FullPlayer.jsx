import React, { useState, useRef, useCallback, useEffect } from 'react';
import useSwipe from '../hooks/useSwipe';
import ShareMenu from './ShareMenu';
import Visualizer from './Visualizer';
import LyricsPanel from './LyricsPanel';
import { EQ_PRESETS, EQ_BANDS } from '../data/equalizer';
import { fmt } from '../utils';
import usePlayerStore from '../stores/playerStore';
import useUIStore from '../stores/uiStore';
import useLibraryStore from '../stores/libraryStore';
import { createToast } from './Toast';
import './FullPlayer.css';

const VIZ_MODES = ['none', 'bars', 'circle', 'waves'];
const VIZ_LABELS = { none: '🎨', bars: '📊', circle: '◯', waves: '〰️' };

const FullPlayer = () => {
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const isSimulated = usePlayerStore(s => s.isSimulated);
  const playbackSpeed = usePlayerStore(s => s.playbackSpeed);
  const volume = usePlayerStore(s => s.volume);
  const isMuted = usePlayerStore(s => s.isMuted);
  const isRadioMode = usePlayerStore(s => s.isRadioMode);
  const queue = usePlayerStore(s => s.queue);
  const togglePlay = usePlayerStore(s => s.togglePlay);
  const skipTime = usePlayerStore(s => s.skipTime);
  const seek = usePlayerStore(s => s.seek);
  const setSpeed = usePlayerStore(s => s.setSpeed);
  const setShowFullPlayer = usePlayerStore(s => s.setShowFullPlayer);
  const toggleMute = usePlayerStore(s => s.toggleMute);
  const removeFromQueue = usePlayerStore(s => s.removeFromQueue);
  const stopRadio = usePlayerStore(s => s.stopRadio);
  const playOrToggle = usePlayerStore(s => s.playOrToggle);

  const sleepTimer = useUIStore(s => s.sleepTimer);
  const sleepOptions = useUIStore(s => s.sleepOptions);
  const setSleepTimer = useUIStore(s => s.setSleepTimer);
  const cancelSleepTimer = useUIStore(s => s.cancelSleepTimer);
  const toggleSleepOptions = useUIStore(s => s.toggleSleepOptions);
  const addToast = useUIStore(s => s.addToast);

  const likedTracks = useLibraryStore(s => s.likedTracks);
  const toggleLike = useLibraryStore(s => s.toggleLike);

  const isRadio = currentTrack?.type === 'radio';

  // Compute display values from store
  const storeState = usePlayerStore.getState();
  const displayTime = isSimulated ? storeState.simulatedTime : storeState.currentTime;
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
  const panelRef = useRef(null);
  const [showShare, setShowShare] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [vizMode, setVizMode] = useState('none');
  const [eqOpen, setEqOpen] = useState(false);
  const [eqPreset, setEqPreset] = useState('flat');

  // Swipe down on the full player panel to close it
  const swipeHandlers = useSwipe({
    onSwipeDown: () => setShowFullPlayer(false),
    thresholdY: 30,
  });

  // Cycle through visualizer modes (must be before early return — hooks rule)
  const cycleVizMode = useCallback(() => {
    setVizMode(prev => {
      const idx = VIZ_MODES.indexOf(prev);
      return VIZ_MODES[(idx + 1) % VIZ_MODES.length];
    });
  }, []);

  // Focus trap and Escape key handling
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setShowFullPlayer(false);
        return;
      }
      if (e.key === 'Tab') {
        const focusable = panel.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    panel.addEventListener('keydown', handleKeyDown);
    const closeBtn = panel.querySelector('.fullplayer__close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 100);

    return () => panel.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!currentTrack) return null;

  const handleBar = (e) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      seek(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
    }
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const currentPreset = EQ_PRESETS[eqPreset] || EQ_PRESETS.flat;
  const eqBars = currentPreset.freqs;

  const vizColor = currentTrack?.color || '#D4875E';
  const hasVisualizer = vizMode !== 'none';

  const handleToggleLike = () => {
    if (!currentTrack) return;
    const wasLiked = toggleLike(currentTrack.id);
    addToast(createToast(
      wasLiked ? 'removed' : 'liked',
      wasLiked ? 'Removed from likes' : 'Liked ♥',
      ''
    ));
  };

  const handleSleepStart = (minutes) => {
    setSleepTimer(minutes * 60);
  };

  return (
    <div className="fullplayer">
      <div className="fullplayer__backdrop" onClick={() => setShowFullPlayer(false)} />
      <div className="fullplayer__panel" ref={panelRef} style={{ touchAction: 'none' }} {...swipeHandlers}>
        {/* Close */}
        <button className="fullplayer__close" onClick={() => setShowFullPlayer(false)} title="Close" aria-label="Close full player">
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>

        <div className="fullplayer__body">
          {/* Art or Visualizer */}
          {hasVisualizer ? (
            <div className="fullplayer__visualizer">
              <Visualizer
                isPlaying={isPlaying}
                currentTime={displayTime}
                duration={dur}
                color={vizColor}
                mode={vizMode}
              />
            </div>
          ) : (
            <div className="fullplayer__art-wrap">
              <img
                className={`fullplayer__art ${isPlaying ? 'fullplayer__art--spin' : ''}`}
                src={currentTrack.image}
                alt={currentTrack.title}
              />
            </div>
          )}

          {/* Info */}
          <div className="fullplayer__info">
            <h2 className="fullplayer__title">{currentTrack.title}</h2>
            <p className="fullplayer__artist">
              {currentTrack.podcastName || currentTrack.artist}
              {isRadio && <span className="fullplayer__live-badge">LIVE</span>}
              {isRadioMode && <span className="fullplayer__radio-badge">🎵 Smart Radio</span>}
            </p>
            {isRadioMode && (
              <button className="fullplayer__stop-radio" onClick={stopRadio} aria-label="Stop radio">
                ⏹ Stop Radio
              </button>
            )}
          </div>

          {/* Progress */}
          <div className="fullplayer__progress-wrap">
            <div className="fullplayer__progress-bar" ref={barRef} onClick={handleBar}>
              <div className="fullplayer__progress-fill" style={{ width: `${progressPct}%` }}>
                <div className="fullplayer__progress-thumb" />
              </div>
            </div>
            <div className="fullplayer__time-row">
              <span>{fmt(displayTime)}</span>
              <span>{isRadio ? 'LIVE' : fmt(dur)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="fullplayer__controls">
            <button className="fullplayer__ctrl" onClick={() => {
              const idx = speeds.indexOf(playbackSpeed);
              setSpeed(speeds[(idx + 1) % speeds.length]);
            }} title="Playback speed" aria-label={`Speed ${playbackSpeed}x`}>
              <span className="fullplayer__speed">{playbackSpeed}x</span>
            </button>
            <button className="fullplayer__ctrl" onClick={() => skipTime(-15)} title="Skip back 15s" aria-label="Skip back 15 seconds">
              <svg viewBox="0 0 24 24"><path d="M11 10V6l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="currentColor"/></svg>
              <span className="fullplayer__skip-label">15</span>
            </button>
            <button className="fullplayer__play" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
              )}
            </button>
            <button className="fullplayer__ctrl" onClick={() => skipTime(30)} title="Skip forward 30s" aria-label="Skip forward 30 seconds">
              <svg viewBox="0 0 24 24"><path d="M13 10V6l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z" fill="currentColor"/></svg>
              <span className="fullplayer__skip-label">30</span>
            </button>
            <button className={`fullplayer__ctrl ${isLiked ? 'fullplayer__ctrl--active' : ''}`} onClick={handleToggleLike} title={isLiked ? 'Unlike' : 'Like'}>
              {isLiked ? '♥' : '♡'}
            </button>
            <button className="fullplayer__ctrl" onClick={() => setShowShare(true)} title="Share">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>

          {/* Volume + Visualizer Toggle + EQ + Sleep Timer */}
          <div className="fullplayer__extras">
            <div className="fullplayer__vol">
              <button className="fullplayer__mini-btn" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted || volume === 0 ? '🔇' : volume < 40 ? '🔉' : '🔊'}
              </button>
              <div className="fullplayer__vol-bar">
                <div className="fullplayer__vol-fill" style={{ width: `${isMuted ? 0 : volume}%` }} />
              </div>
            </div>

            {/* Visualizer Toggle Button */}
            <button
              className={`fullplayer__viz-btn ${hasVisualizer ? 'fullplayer__viz-btn--active' : ''}`}
              onClick={cycleVizMode}
              title={`Visualizer: ${vizMode === 'none' ? 'Off' : VIZ_LABELS[vizMode]}`}
            >
              {VIZ_LABELS[vizMode]}
            </button>

            {/* Equalizer */}
            <div className="fullplayer__eq">
              <button
                className={`fullplayer__eq-btn ${eqOpen ? 'fullplayer__eq-btn--active' : ''}`}
                onClick={() => setEqOpen(p => !p)}
                title="Equalizer"
              >
                🎛
              </button>
              {eqOpen && (
                <div className="fullplayer__eq-menu">
                  <span className="fullplayer__eq-title">Equalizer — {currentPreset.label}</span>
                  <div className="fullplayer__eq-bars">
                    {eqBars.map((val, i) => (
                      <div
                        key={i}
                        className="fullplayer__eq-bar"
                        style={{
                          height: `${Math.max(8, val * 50)}%`,
                          background: `var(--accent)`,
                          opacity: 0.5 + val * 0.4,
                        }}
                        title={`${EQ_BANDS[i]}: ${val.toFixed(2)}x`}
                      />
                    ))}
                  </div>
                  {Object.entries(EQ_PRESETS).map(([key, preset]) => (
                    <button
                      key={key}
                      className={`fullplayer__eq-opt ${eqPreset === key ? 'fullplayer__eq-opt--active' : ''}`}
                      onClick={() => setEqPreset(key)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="fullplayer__sleep">
              <button className="fullplayer__mini-btn" onClick={toggleSleepOptions} title="Sleep Timer">
                {sleepTimer ? `⏰ ${Math.floor(sleepTimer / 60)}m` : '⏱'}
              </button>
              {sleepOptions && (
                <div className="fullplayer__sleep-menu">
                  <span className="fullplayer__sleep-title">Sleep Timer</span>
                  {[15, 30, 45, 60].map(m => (
                    <button key={m} className="fullplayer__sleep-opt" onClick={() => handleSleepStart(m)}>{m} min</button>
                  ))}
                  {sleepTimer && <button className="fullplayer__sleep-opt fullplayer__sleep-opt--cancel" onClick={cancelSleepTimer}>Cancel</button>}
                  <button className="fullplayer__sleep-opt fullplayer__sleep-opt--cancel" onClick={toggleSleepOptions}>Close</button>
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
                    <button className="fullplayer__queue-play" onClick={() => playOrToggle(item)} title="Play now">▶</button>
                    <button className="fullplayer__queue-del" onClick={() => removeFromQueue(i)}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lyrics Toggle Button */}
          <button
            className={`fullplayer__lyrics-toggle ${showLyrics ? 'fullplayer__lyrics-toggle--active' : ''}`}
            onClick={() => setShowLyrics(p => !p)}
            title={showLyrics ? 'Hide lyrics' : 'Show lyrics'}
          >
            🎤
            <span className="fullplayer__lyrics-toggle-label">
              {showLyrics ? 'Hide Lyrics' : 'Lyrics'}
            </span>
          </button>

          {/* Lyrics Panel */}
          <LyricsPanel
            trackId={currentTrack?.id}
            currentTime={displayTime}
            isVisible={showLyrics}
          />
        </div>
      </div>

      {/* Share Menu */}
      {showShare && (
        <ShareMenu track={currentTrack} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
};

export default FullPlayer;
