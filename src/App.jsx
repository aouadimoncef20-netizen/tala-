import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import PlayerBar from './components/PlayerBar';
import FullPlayer from './components/FullPlayer';
import PremiumView from './components/PremiumView';
import Toast, { createToast } from './components/Toast';
import { generateTone } from './components/LazyImage';
import useLocalStorage from './hooks/useLocalStorage';

const formatDuration = (ep) => {
  if (ep?.duration) {
    const parts = ep.duration.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
  }
  return 1200;
};

const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedTracks, setLikedTracks] = useLocalStorage('tala_liked', []);
  const [currentTime, setCurrentTime] = useState(0);
  const [simulatedTime, setSimulatedTime] = useState(0);
  const [isSimulated, setIsSimulated] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [queue, setQueue] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useLocalStorage('tala_theme', 'dark');

  const handleToast = useCallback((type, title, message) => {
    const toast = createToast(type, title, message);
    setToasts(prev => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Sleep timer
  const [sleepTimer, setSleepTimer] = useState(null); // remaining seconds or null
  const [sleepOptions, setSleepOptions] = useState(false);
  const sleepRef = useRef(null);

  useEffect(() => {
    if (sleepTimer !== null && sleepTimer > 0 && isPlaying) {
      sleepRef.current = setInterval(() => {
        setSleepTimer(prev => {
          if (prev <= 1) { clearInterval(sleepRef.current); setIsPlaying(false); return null; }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(sleepRef.current);
    }
    return () => clearInterval(sleepRef.current);
  }, [sleepTimer, isPlaying]);

  const handleSleepStart = (minutes) => {
    setSleepTimer(minutes * 60);
    setSleepOptions(false);
  };

  const handleSleepCancel = () => {
    setSleepTimer(null);
    setSleepOptions(false);
    clearInterval(sleepRef.current);
  };

  const audioRef = useRef(null);
  const simRef = useRef(null);
  const toneUrlRef = useRef(null);
  const isRadio = currentTrack?.type === 'radio';

  // Audio element
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;
    const onEnded = () => {
      if (queue.length > 0) {
        const next = queue[0];
        setQueue(prev => prev.slice(1));
        setCurrentTrack(next);
        setIsPlaying(true);
        setSimulatedTime(0);
        setCurrentTime(0);
      } else {
        setIsPlaying(false);
      }
    };
    audio.addEventListener('ended', onEnded);
    return () => { audio.pause(); if (toneUrlRef.current) URL.revokeObjectURL(toneUrlRef.current); };
  }, [queue]);

  // Generate real audio tone for each track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying && currentTrack && !isRadio) {
      const freq = 220 + ((currentTrack.id?.length || 0) * 30) % 440;
      const toneUrl = generateTone(freq, 3600, 22050);
      if (toneUrlRef.current) URL.revokeObjectURL(toneUrlRef.current);
      toneUrlRef.current = toneUrl;
      audio.src = toneUrl;
      audio.loop = true;
      audio.play().then(() => setIsSimulated(false)).catch(() => setIsSimulated(true));
    } else if (isPlaying && currentTrack && isRadio) {
      setIsSimulated(true);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, isRadio]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  // Simulated playback
  useEffect(() => {
    if (isPlaying && currentTrack && isSimulated && !isRadio) {
      const total = formatDuration(currentTrack);
      simRef.current = setInterval(() => {
        setSimulatedTime(prev => {
          if (prev >= total) { clearInterval(simRef.current); return total; }
          return prev + (1 * playbackSpeed);
        });
      }, 1000);
    } else { clearInterval(simRef.current); }
    return () => clearInterval(simRef.current);
  }, [isPlaying, currentTrack, isSimulated, playbackSpeed, isRadio]);

  useEffect(() => {
    if (isPlaying && currentTrack && isSimulated && isRadio) {
      simRef.current = setInterval(() => setSimulatedTime(prev => (prev + (1 * playbackSpeed)) % 3600), 1000);
    }
    return () => clearInterval(simRef.current);
  }, [isPlaying, currentTrack, isSimulated, playbackSpeed, isRadio]);

  useEffect(() => {
    setSimulatedTime(0); setCurrentTime(0); setIsSimulated(true);
  }, [currentTrack?.id]);

  const getDisplayTime = () => isSimulated ? simulatedTime : currentTime;
  const getDuration = () => isRadio ? 3600 : formatDuration(currentTrack);
  const displayTime = getDisplayTime();
  const duration = getDuration();
  const progressPct = duration > 0 ? (displayTime / duration) * 100 : 0;

  const handleSkip = (secs) => {
    if (!currentTrack) return;
    const total = formatDuration(currentTrack);
    if (isSimulated) setSimulatedTime(prev => Math.max(0, Math.min(total, prev + secs)));
    else setCurrentTime(prev => Math.max(0, Math.min(total, (prev || 0) + secs)));
  };

  const handlePlay = useCallback((track) => {
    if (currentTrack?.id === track.id) { setIsPlaying(p => !p); return; }
    setCurrentTrack(track);
    setIsPlaying(true);
    setSimulatedTime(0);
    setCurrentTime(0);
    setIsSimulated(true);
  }, [currentTrack]);

  const handleSeek = useCallback((pct) => {
    const total = formatDuration(currentTrack);
    const newTime = (pct / 100) * total;
    if (isSimulated) setSimulatedTime(newTime);
    else setCurrentTime(newTime);
  }, [currentTrack, isSimulated]);

  const handleToggleLike = useCallback((id) => {
    setLikedTracks(prev => {
      const isLiked = prev.includes(id);
      const newVal = isLiked ? prev.filter(x => x !== id) : [...prev, id];
      handleToast(isLiked ? 'info' : 'liked', isLiked ? 'Removed from likes' : 'Liked ♥', '');
      return newVal;
    });
  }, [setLikedTracks]);

  const handleAddToQueue = useCallback((track) => {
    setQueue(prev => [...prev, track]);
    handleToast('added', 'Added to queue', track?.title || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenArtist = useCallback((id) => { setSelectedArtist(id); setActiveView('artist'); }, []);
  const handleOpenAlbum = useCallback((id) => { setSelectedAlbum(id); setActiveView('album'); }, []);
  const handleOpenAudiobook = useCallback(() => { setActiveView('audiobooks'); }, []);
  const handleOpenProfile = useCallback(() => { setActiveView('profile'); }, []);
  const handleOpenPremium = useCallback(() => { setShowPremium(true); }, []);

  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    if (q.trim()) setActiveView('search');
    else setActiveView('home');
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      switch (e.code) {
        case 'Space': e.preventDefault(); if (currentTrack) setIsPlaying(p => !p); break;
        case 'ArrowLeft':
          e.preventDefault();
          if (!currentTrack) break;
          setSimulatedTime(prev => Math.max(0, prev - 15));
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!currentTrack) break;
          setSimulatedTime(prev => Math.min(formatDuration(currentTrack), prev + 30));
          break;
        case 'KeyM': e.preventDefault(); setIsMuted(p => !p); break;
        case 'Escape': setShowFullPlayer(false); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, showFullPlayer]);

  return (
    <div className="app" data-theme={theme}>
      <div className={`app__main ${showFullPlayer ? 'app__main--blurred' : ''}`}>
        <div className="app__content">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={handleSearch}
            activeView={activeView}
            onBack={() => { setActiveView('home'); setSelectedArtist(null); setSelectedAlbum(null); }}
            onOpenProfile={handleOpenProfile}
            onOpenPremium={handleOpenPremium}
            theme={theme}
            onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          />
          <MainContent
            activeView={activeView}
            searchQuery={searchQuery}
            onPlay={handlePlay}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            setActiveView={setActiveView}
            likedTracks={likedTracks}
            onToggleLike={handleToggleLike}
            queue={queue}
            onAddToQueue={handleAddToQueue}
            onOpenArtist={handleOpenArtist}
            onOpenAlbum={handleOpenAlbum}
            onOpenAudiobook={handleOpenAudiobook}
            onOpenPodcast={() => {}}
            selectedArtist={selectedArtist}
            selectedAlbum={selectedAlbum}
            selectedPodcast={null}
            onToast={handleToast}
          />
        </div>
        <Sidebar activeView={activeView} setActiveView={setActiveView} onOpenArtist={handleOpenArtist} />
      </div>

      {showFullPlayer && (
        <FullPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => currentTrack && setIsPlaying(p => !p)}
          onSkipBack={() => handleSkip(-15)}
          onSkipForward={() => handleSkip(30)}
          progress={progressPct}
          onSeek={handleSeek}
          currentTime={displayTime}
          duration={duration}
          isRadio={isRadio}
          playbackSpeed={playbackSpeed}
          onChangeSpeed={setPlaybackSpeed}
          isLiked={currentTrack ? likedTracks.includes(currentTrack.id) : false}
          onToggleLike={() => currentTrack && handleToggleLike(currentTrack.id)}
          volume={volume}
          onSetVolume={setVolume}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(p => !p)}
          onClose={() => setShowFullPlayer(false)}
          queue={queue}
          onRemoveFromQueue={(i) => setQueue(prev => prev.filter((_, idx) => idx !== i))}
          onPlayItem={handlePlay}
          sleepTimer={sleepTimer}
          sleepOptions={sleepOptions}
          onSleepStart={handleSleepStart}
          onSleepCancel={handleSleepCancel}
          onToggleSleepOptions={() => setSleepOptions(p => !p)}
        />
      )}

      {showPremium && (
        <PremiumView onClose={() => setShowPremium(false)} />
      )}

      <Toast toasts={toasts} onRemove={removeToast} />

      <PlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={() => currentTrack && setIsPlaying(p => !p)}
        onSkipBack={() => handleSkip(-15)}
        onSkipForward={() => handleSkip(30)}
        progress={progressPct}
        onSeek={handleSeek}
        currentTime={displayTime}
        duration={duration}
        isRadio={isRadio}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={setPlaybackSpeed}
        isLiked={currentTrack ? likedTracks.includes(currentTrack.id) : false}
        onToggleLike={() => currentTrack && handleToggleLike(currentTrack.id)}
        volume={volume}
        onSetVolume={setVolume}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(p => !p)}
        onExpand={() => setShowFullPlayer(true)}
        sleepTimer={sleepTimer}
      />
    </div>
  );
};

export default App;
