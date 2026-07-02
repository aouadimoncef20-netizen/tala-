import { create } from 'zustand';

function getDuration(track) {
  if (!track?.duration) return 1200;
  if (track.duration === 'Live') return 3600;
  const parts = track.duration.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 1200;
}

const usePlayerStore = create((set, get) => ({
  // State
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  simulatedTime: 0,
  isSimulated: false,
  playbackSpeed: 1,
  volume: 70,
  isMuted: false,
  queue: [],
  showFullPlayer: false,
  isRadioMode: false,
  radioQueue: [],
  wasSleepTimerTriggered: false,

  // Actions
  play: (track) => set({
    currentTrack: track,
    isPlaying: true,
    simulatedTime: 0,
    currentTime: 0,
    isSimulated: true,
    showFullPlayer: false,
  }),

  togglePlay: () => set(state => ({ isPlaying: !state.isPlaying })),

  setPlaying: (playing) => set({ isPlaying: playing }),

  skipTime: (seconds) => set(state => {
    const total = getDuration(state.currentTrack);
    if (state.isSimulated) {
      const newTime = Math.max(0, Math.min(total, state.simulatedTime + seconds));
      return { simulatedTime: newTime };
    }
    const newTime = Math.max(0, Math.min(total, (state.currentTime || 0) + seconds));
    return { currentTime: newTime };
  }),

  seek: (pct) => set(state => {
    const total = getDuration(state.currentTrack);
    const newTime = (pct / 100) * total;
    if (state.isSimulated) return { simulatedTime: newTime };
    return { currentTime: newTime };
  }),

  setVolume: (vol) => set({ volume: Math.max(0, Math.min(100, vol)) }),

  toggleMute: () => set(state => ({ isMuted: !state.isMuted })),

  setSpeed: (speed) => set({ playbackSpeed: speed }),

  setShowFullPlayer: (show) => set({ showFullPlayer: show }),

  addToQueue: (track) => set(state => ({ queue: [...state.queue, track] })),

  removeFromQueue: (index) => set(state => ({
    queue: state.queue.filter((_, i) => i !== index)
  })),

  clearQueue: () => set({ queue: [] }),

  playNext: () => {
    const { queue } = get();
    if (queue.length > 0) {
      const next = queue[0];
      set({
        currentTrack: next,
        isPlaying: true,
        queue: queue.slice(1),
        simulatedTime: 0,
        currentTime: 0,
        isSimulated: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },

  // Radio mode
  startRadio: (tracks) => {
    if (tracks.length === 0) return;
    set({
      isRadioMode: true,
      radioQueue: tracks.slice(1),
      currentTrack: tracks[0],
      isPlaying: true,
      simulatedTime: 0,
      currentTime: 0,
      isSimulated: true,
    });
  },

  stopRadio: () => set({
    isRadioMode: false,
    radioQueue: [],
    isPlaying: false,
    currentTrack: null,
  }),

  // Convenience: get computed values
  getDisplayTime: () => {
    const state = get();
    return state.isSimulated ? state.simulatedTime : state.currentTime;
  },

  getDuration: () => getDuration(get().currentTrack),

  getProgressPct: () => {
    const state = get();
    const dur = getDuration(state.currentTrack);
    const time = state.isSimulated ? state.simulatedTime : state.currentTime;
    return dur > 0 ? (time / dur) * 100 : 0;
  },

  isRadio: () => get().currentTrack?.type === 'radio',

  // Like original handlePlay: toggle if same track, else start new
  playOrToggle: (track) => {
    const state = get();
    if (state.currentTrack?.id === track.id) {
      set({ isPlaying: !state.isPlaying });
    } else {
      set({
        currentTrack: track,
        isPlaying: true,
        simulatedTime: 0,
        currentTime: 0,
        isSimulated: true,
        showFullPlayer: false,
      });
    }
  },

  // Set simulated state (called from audio effects)
  setSimulated: (val) => set({ isSimulated: val }),

  resetTime: () => set({ simulatedTime: 0, currentTime: 0, isSimulated: true }),
}));

export default usePlayerStore;
export { getDuration };
