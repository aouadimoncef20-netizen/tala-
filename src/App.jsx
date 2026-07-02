import React, { useEffect, useRef } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import PlayerBar from './components/PlayerBar';
import MiniPlayer from './components/MiniPlayer';
import FullPlayer from './components/FullPlayer';
import PremiumView from './components/PremiumView';
import Toast from './components/Toast';
import { generateTone } from './components/LazyImage';
import { generateRadioStream } from './data/recommendations';
import usePlayerStore from './stores/playerStore';
import useUIStore from './stores/uiStore';
import useLibraryStore from './stores/libraryStore';

const App = () => {
  // --- Subscribe to slices from all stores ---
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const isSimulated = usePlayerStore(s => s.isSimulated);
  const playbackSpeed = usePlayerStore(s => s.playbackSpeed);
  const volume = usePlayerStore(s => s.volume);
  const isMuted = usePlayerStore(s => s.isMuted);
  const showFullPlayer = usePlayerStore(s => s.showFullPlayer);
  const isRadioMode = usePlayerStore(s => s.isRadioMode);
  const setPlaying = usePlayerStore(s => s.setPlaying);
  const setSimulated = usePlayerStore(s => s.setSimulated);

  const sleepTimer = useUIStore(s => s.sleepTimer);
  const setSleepTimer = useUIStore(s => s.setSleepTimer);
  const cancelSleepTimer = useUIStore(s => s.cancelSleepTimer);
  const showPremium = useUIStore(s => s.showPremium);
  const setShowPremium = useUIStore(s => s.setShowPremium);

  const theme = useLibraryStore(s => s.theme);

  const isRadio = currentTrack?.type === 'radio';

  // --- Refs ---
  const audioRef = useRef(null);
  const simRef = useRef(null);
  const toneUrlRef = useRef(null);
  const sleepRef = useRef(null);
  const [scrolled, setScrolled] = React.useState(false);

  // --- Audio element (one-time setup) ---
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;
    const onEnded = () => {
      const st = usePlayerStore.getState();
      // If sleep timer triggered the stop, don't auto-play next
      if (st.wasSleepTimerTriggered) {
        usePlayerStore.setState({ wasSleepTimerTriggered: false, isPlaying: false });
        return;
      }
      // Radio mode: play next from radio queue or generate more
      if (st.isRadioMode) {
        if (st.radioQueue.length > 0) {
          const next = st.radioQueue[0];
          usePlayerStore.setState({
            currentTrack: next,
            isPlaying: true,
            radioQueue: st.radioQueue.slice(1),
            simulatedTime: 0,
            currentTime: 0,
            isSimulated: true,
          });
        } else {
          // Radio queue exhausted — generate more tracks
          const seed = st.currentTrack?.artistId || 'khaled';
          const moreTracks = generateRadioStream(
            st.currentTrack?.id || 'track_khaled_0',
            20
          );
          if (moreTracks.length > 0) {
            const next = moreTracks[0];
            usePlayerStore.setState({
              currentTrack: next,
              isPlaying: true,
              radioQueue: moreTracks.slice(1),
              simulatedTime: 0,
              currentTime: 0,
              isSimulated: true,
            });
          } else {
            usePlayerStore.setState({ isPlaying: false, isRadioMode: false });
          }
        }
        return;
      }
      // Normal queue mode
      if (st.queue.length > 0) {
        const next = st.queue[0];
        usePlayerStore.setState({
          currentTrack: next,
          isPlaying: true,
          queue: st.queue.slice(1),
          simulatedTime: 0,
          currentTime: 0,
          isSimulated: true,
        });
      } else {
        setPlaying(false);
      }
    };
    audio.addEventListener('ended', onEnded);
    return () => { audio.removeEventListener('ended', onEnded); audio.pause(); if (toneUrlRef.current) URL.revokeObjectURL(toneUrlRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Generate real audio tone for each track ---
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
      audio.play().then(() => setSimulated(false)).catch(() => setSimulated(true));
    } else if (isPlaying && currentTrack && isRadio) {
      setSimulated(true);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, isRadio, setSimulated]);

  // --- Volume ---
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  // --- Simulated playback (non-radio) ---
  useEffect(() => {
    if (isPlaying && currentTrack && isSimulated && !isRadio) {
      simRef.current = setInterval(() => {
        usePlayerStore.setState(s => {
          const track = s.currentTrack;
          const dur = track?.duration;
          let total = 1200;
          if (dur && dur !== 'Live') {
            const parts = dur.split(':').map(Number);
            total = parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2]
              : parts.length === 2 ? parts[0] * 60 + parts[1] : 1200;
          }
          return {
            simulatedTime: s.simulatedTime >= total ? total : s.simulatedTime + (1 * s.playbackSpeed)
          };
        });
      }, 1000);
    } else {
      clearInterval(simRef.current);
    }
    return () => clearInterval(simRef.current);
  }, [isPlaying, currentTrack, isSimulated, playbackSpeed, isRadio]);

  // --- Simulated playback (radio — wraps around) ---
  useEffect(() => {
    if (isPlaying && currentTrack && isSimulated && isRadio) {
      simRef.current = setInterval(() => {
        usePlayerStore.setState(s => ({
          simulatedTime: (s.simulatedTime + (1 * s.playbackSpeed)) % 3600
        }));
      }, 1000);
    }
    return () => clearInterval(simRef.current);
  }, [isPlaying, currentTrack, isSimulated, playbackSpeed, isRadio]);

  // --- Reset time on track change ---
  useEffect(() => {
    usePlayerStore.getState().resetTime();
  }, [currentTrack?.id]);

  // --- Sleep Timer ---
  const sleepTimerActive = sleepTimer !== null && sleepTimer > 0;

  useEffect(() => {
    if (sleepTimerActive && isPlaying) {
      sleepRef.current = setInterval(() => {
        const current = useUIStore.getState().sleepTimer;
        if (current !== null && current <= 1) {
          clearInterval(sleepRef.current);
          usePlayerStore.setState({ wasSleepTimerTriggered: true });
          setPlaying(false);
          cancelSleepTimer();
        } else if (current !== null) {
          setSleepTimer(current - 1);
        }
      }, 1000);
    } else {
      clearInterval(sleepRef.current);
    }
    return () => clearInterval(sleepRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sleepTimerActive, isPlaying]);

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      const store = usePlayerStore.getState();
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (store.currentTrack) store.togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (store.currentTrack) store.skipTime(-15);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (store.currentTrack) store.skipTime(15);
          break;
        case 'KeyM':
          break;
        case 'Escape':
          store.setShowFullPlayer(false);
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // --- Media Session API — lock screen / notification controls ---
  useEffect(() => {
    if (!currentTrack) return;
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist || currentTrack.podcastName || '',
        album: '',
        artwork: [{ src: currentTrack.image, sizes: '512x512', type: 'image/jpeg' }],
      });
      navigator.mediaSession.setActionHandler('play', () => usePlayerStore.getState().setPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => usePlayerStore.getState().setPlaying(false));
      navigator.mediaSession.setActionHandler('previoustrack', () => usePlayerStore.getState().skipTime(-15));
      navigator.mediaSession.setActionHandler('nexttrack', () => usePlayerStore.getState().skipTime(15));
    }
  }, [currentTrack]);

  // --- Scroll listener for MiniPlayer ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app" data-theme={theme}>
      {/* Screen reader announcement for track changes */}
      <div aria-live="polite" className="sr-only">
        {currentTrack ? `Now playing: ${currentTrack.title} by ${currentTrack.artist || currentTrack.podcastName}` : ''}
      </div>
      <div className={`app__main ${showFullPlayer ? 'app__main--blurred' : ''}`}>
        <div className="app__content">
          <Header />
          <MainContent />
        </div>
        <Sidebar />
      </div>

      {showFullPlayer && <FullPlayer />}

      {showPremium && (
        <PremiumView onClose={() => setShowPremium(false)} />
      )}

      <Toast />

      <MiniPlayer visible={!!currentTrack && scrolled} />

      <PlayerBar />
    </div>
  );
};

export default App;
