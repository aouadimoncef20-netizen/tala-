import React, { useState, useMemo } from 'react';
import { TRACKS } from '../data/tracks';
import usePlayerStore from '../stores/playerStore';

const MOODS = [
  {
    id: 'morning-energy', name: 'Morning Energy', icon: '☀️',
    color: '#F5A623', gradient: 'linear-gradient(135deg, #F5A623, #E65100)',
    desc: 'Start your day right',
    artistIds: ['el-anka', 'harrachi', 'amar', 'boudjema'],
  },
  {
    id: 'late-night', name: 'Late Night', icon: '🌙',
    color: '#7B1FA2', gradient: 'linear-gradient(135deg, #1A0533, #4A0E78)',
    desc: 'After hours vibes',
    artistIds: ['khaled', 'cheb-hasni', 'cheb-mami', 'zahouania', 'bilal', 'cheb-rimi', 'cheb-akil'],
  },
  {
    id: 'workout', name: 'Workout', icon: '💪',
    color: '#00ACC1', gradient: 'linear-gradient(135deg, #00ACC1, #006064)',
    desc: 'Push your limits',
    artistIds: ['lotfi-dz', 'didine', 'tiba'],
  },
  {
    id: 'deep-focus', name: 'Deep Focus', icon: '🎯',
    color: '#388E3C', gradient: 'linear-gradient(135deg, #1B5E20, #388E3C)',
    desc: 'Stay in the zone',
    artistIds: ['idir', 'lounis', 'matoub', 'taos'],
  },
  {
    id: 'chill-vibes', name: 'Chill Vibes', icon: '😌',
    color: '#C8A45C', gradient: 'linear-gradient(135deg, #C8A45C, #5D4037)',
    desc: 'Relax and unwind',
    artistIds: ['tamtam', 'groupe-douli'],
  },
  {
    id: 'road-trip', name: 'Road Trip', icon: '🚗',
    color: '#D32F2F', gradient: 'linear-gradient(135deg, #D32F2F, #F5A623)',
    desc: 'Hit the road',
    artistIds: ['khaled', 'bilal', 'lotfi-dz', 'groupe-douli', 'harrachi', 'idir'],
  },
];

const MoodPlaylists = () => {
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const playOrToggle = usePlayerStore(s => s.playOrToggle);
  const [selectedMood, setSelectedMood] = useState(null);

  const moodTracks = useMemo(() => {
    const map = {};
    MOODS.forEach((mood) => {
      const ids = new Set(mood.artistIds);
      map[mood.id] = TRACKS.filter((t) => ids.has(t.artistId));
    });
    return map;
  }, []);

  const isActive = (id) => currentTrack?.id === id && isPlaying;

  const playTrack = (track) => {
    playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId });
  };

  const handleMoodClick = (mood) => setSelectedMood(mood);

  const activeMoodTracks = selectedMood ? moodTracks[selectedMood.id] || [] : [];

  return (
    <section className="px-5 mt-7">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-base font-bold section-title text-[var(--text-primary)]">Mood</span>
          <span className="text-[11px] text-[var(--text-subdued)] ml-2">playlists</span>
        </div>
      </div>

      {/* Mood Cards */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {MOODS.map((mood) => (
          <div
            key={mood.id}
            className="relative min-w-[150px] max-w-[150px] rounded-[var(--radius-md)] p-3.5 cursor-pointer overflow-hidden group"
            style={{ background: mood.gradient }}
            onClick={() => handleMoodClick(mood)}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="relative z-10">
              <span className="text-xl">{mood.icon}</span>
              <div className="text-sm font-bold text-white mt-1.5">{mood.name}</div>
              <div className="text-[9px] text-white/70 mt-0.5">{mood.desc} · {moodTracks[mood.id]?.length || 0} tracks</div>
              <button
                className="mt-2 w-7 h-7 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                onClick={(e) => { e.stopPropagation(); const tracks = moodTracks[mood.id]; if (tracks?.length) playTrack(tracks[0]); setSelectedMood(mood); }}
              >
                <i className="fa-solid fa-play text-white text-xs ml-0.5"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mood Tracks Overlay */}
      {selectedMood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setSelectedMood(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md mx-4 max-h-[80vh] bg-[var(--bg-elevated)] rounded-xl overflow-hidden animate-scale-in shadow-[var(--shadow-lg)] border border-[var(--border)]" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]" style={{ borderBottomColor: selectedMood.color + '33' }}>
              <span className="text-2xl">{selectedMood.icon}</span>
              <div className="flex-1">
                <div className="text-base font-bold text-[var(--text-primary)]">{selectedMood.name}</div>
                <div className="text-[11px] text-[var(--text-subdued)]">{activeMoodTracks.length} tracks · {selectedMood.desc}</div>
              </div>
              <button className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--text-subdued)] hover:bg-[var(--bg-card)] transition-colors text-sm" onClick={() => setSelectedMood(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Tracks */}
            <div className="overflow-y-auto max-h-[60vh]">
              {activeMoodTracks.length === 0 ? (
                <div className="py-10 text-center">
                  <i className="fa-regular fa-circle text-2xl text-[var(--text-subdued)] mb-2"></i>
                  <div className="text-sm text-[var(--text-subdued)]">No tracks found for this mood</div>
                </div>
              ) : (
                activeMoodTracks.map((track, i) => (
                  <div key={track.id}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200 animate-fade-in-up ${
                      isActive(track.id) ? 'bg-[var(--accent-glow)] bg-opacity-10' : 'hover:bg-[var(--bg-card)]'
                    }`}
                    onClick={() => playTrack(track)}
                    style={{ animationDelay: `${i * 0.025}s` }}>
                    <span className="text-xs text-[var(--text-subdued)] w-5 text-right">{i + 1}</span>
                    <img className="w-9 h-9 rounded object-cover" src={track.image} alt={track.title} loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--text-primary)] truncate flex items-center gap-1">
                        {isActive(track.id) && <span className="w-1.5 h-1.5 rounded-full bg-[#D4875E] flex-shrink-0" />}
                        {track.title}
                      </div>
                      <div className="text-xs text-[var(--text-subdued)] truncate">{track.artist}</div>
                    </div>
                    <span className="text-xs text-[var(--text-subdued)]">{track.duration}</span>
                    <button className="w-6 h-6 flex items-center justify-center text-xs text-[var(--text-subdued)] hover:text-[var(--text-primary)] transition-colors" onClick={(e) => { e.stopPropagation(); playTrack(track); }}>
                      {isActive(track.id) ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoodPlaylists;
