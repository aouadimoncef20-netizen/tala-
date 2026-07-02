import React, { memo, useRef } from 'react';
import useSwipe from '../hooks/useSwipe';
import { fmt } from '../utils';
import usePlayerStore from '../stores/playerStore';
import useUIStore from '../stores/uiStore';
import useLibraryStore from '../stores/libraryStore';
import { createToast } from './Toast';

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
    thresholdX: 50, thresholdY: 30,
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
    addToast(createToast(wasLiked ? 'removed' : 'liked', wasLiked ? 'Removed from likes' : 'Liked ♥', ''));
  };

  const cycleSpeed = () => {
    setSpeed(playbackSpeed >= 2 ? 0.5 : +(playbackSpeed + 0.25).toFixed(2));
  };

  if (!currentTrack) {
    return (
      <div className="animate-slide-up fixed bottom-0 left-0 right-0 glass border-t border-[var(--border)] z-200" style={{ height: 'var(--player-height)' }}>
        <div className="h-full flex items-center justify-center gap-2 text-[var(--text-subdued)] text-xs">
          <i className="fa-solid fa-circle-notch text-sm opacity-50"></i>
          <span>Select a track to play</span>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up fixed bottom-0 left-0 right-0 z-200" ref={playerRef} style={{ touchAction: 'none', height: 'var(--player-height)' }} {...swipeHandlers}>
      {/* Top progress bar */}
      <div className={`h-[3px] bg-[var(--border)] cursor-pointer relative ${isPlaying ? 'border-t-[1px] border-[#D4875E] shadow-[0_-4px_24px_rgba(212,135,94,0.2)]' : ''}`}>
        <div ref={barRef} className="h-full absolute inset-0" onClick={handleBar} style={{ top: '-4px', height: '10px' }} />
        <div className="h-full bg-gradient-to-r from-[#D4875E] to-[#C9A04A] transition-all duration-150 rounded-r-sm" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="h-[calc(var(--player-height)-3px)] flex items-center justify-between px-4 gap-3 bg-[rgba(12,15,20,0.92)] backdrop-blur-[20px] border-t border-[var(--border)]">
        {/* Left: Track info */}
        <div className="w-[25%] min-w-[180px] max-w-[280px] flex items-center gap-2.5 cursor-pointer" onClick={() => setShowFullPlayer(true)} aria-label="Open full player" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowFullPlayer(true); } }}>
          <img className={`w-10 h-10 rounded object-cover flex-shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`} src={currentTrack.image} alt={currentTrack.title} />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[var(--text-primary)] truncate">{currentTrack.title}</div>
            <div className="text-[10px] text-[var(--text-subdued)] flex items-center gap-1 truncate">
              {currentTrack.podcastName || currentTrack.artist}
              {isRadio && <span className="text-[7px] font-bold text-[#4A9BAA] bg-[#4A9BAA]/15 px-1 py-[1px] rounded uppercase tracking-wider animate-pulse">LIVE</span>}
              {isRadioMode && <span className="text-[7px] font-bold text-[#C9A04A] bg-[#C9A04A]/15 px-1 py-[1px] rounded uppercase tracking-wider animate-pulse">Radio</span>}
            </div>
          </div>
          <button className="w-[26px] h-[26px] flex items-center justify-center rounded text-[var(--text-subdued)] hover:bg-[var(--bg-card)] hover:text-[var(--text-secondary)] hover:scale-110 transition-all text-sm flex-shrink-0" onClick={(e) => { e.stopPropagation(); handleToggleLike(); }} title={isLiked ? 'Unlike' : 'Like'} aria-label={isLiked ? 'Unlike' : 'Like'}>
            <i className={`${isLiked ? 'fa-solid text-[#D4875E]' : 'fa-regular'} fa-heart`}></i>
          </button>
        </div>

        {/* Center: Controls */}
        <div className="flex-1 max-w-[360px] flex flex-col items-center gap-[2px]">
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 flex items-center justify-center rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] hover:scale-110 transition-all text-[10px] font-bold" onClick={cycleSpeed} title="Playback speed" aria-label={`Speed ${playbackSpeed}x`}>
              {playbackSpeed}x
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] hover:scale-110 transition-all" onClick={() => skipTime(-15)} title="Skip back 15s" aria-label="Skip back 15 seconds">
              <i className="fa-solid fa-rotate-left text-sm"></i>
            </button>
            <button className="w-8 h-8 rounded-md bg-[#D4875E] text-[#0C0F14] flex items-center justify-center hover:bg-[#E09B75] transition-all hover:shadow-[0_0_20px_rgba(212,135,94,0.25)] hover:scale-105 active:scale-95" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'} aria-label={isPlaying ? 'Pause' : 'Play'}>
              <i className={`text-sm ${isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play ml-0.5'}`}></i>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] hover:scale-110 transition-all" onClick={() => skipTime(30)} title="Skip forward 30s" aria-label="Skip forward 30 seconds">
              <i className="fa-solid fa-rotate-right text-sm"></i>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] hover:scale-110 transition-all" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'} aria-label={isMuted ? 'Unmute' : 'Mute'}>
              <i className={`text-sm ${isMuted || volume === 0 ? 'fa-solid fa-volume-xmark' : volume < 40 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high'}`}></i>
            </button>
          </div>
          <div className="w-full flex justify-between">
            <span className="text-[9px] text-[var(--text-subdued)] tabular-nums">{fmt(displayTime)}</span>
            <span className="text-[9px] text-[var(--text-subdued)] tabular-nums">{isRadio ? 'LIVE' : fmt(dur)}</span>
          </div>
        </div>

        {/* Right: Sleep timer + Volume */}
        <div className="w-[15%] min-w-[80px] max-w-[140px] flex items-center justify-end gap-2">
          {sleepTimer ? <span className="text-[9px] text-[#C9A04A] font-semibold tabular-nums whitespace-nowrap" title="Sleep timer active"><i className="fa-regular fa-clock mr-1"></i>{Math.floor(sleepTimer / 60)}m</span> : null}
          <div className="w-full">
            <div className="h-[3px] bg-[var(--border)] rounded cursor-pointer overflow-hidden hover:h-[4px] transition-all">
              <div className="h-full rounded transition-all duration-100" style={{ width: `${isMuted ? 0 : volume}%`, background: 'var(--text-secondary)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PlayerBar;
