import React, { useState, useMemo } from 'react';
import { TRACKS } from '../data/tracks';
import usePlayerStore from '../stores/playerStore';
import './MoodPlaylists.css';

const MOODS = [
  {
    id: 'morning-energy',
    name: 'Morning Energy',
    icon: '☀️',
    color: '#F5A623',
    gradient: 'linear-gradient(135deg, #F5A623, #E65100)',
    desc: 'Start your day right',
    artistIds: ['el-anka', 'harrachi', 'amar', 'boudjema'],
  },
  {
    id: 'late-night',
    name: 'Late Night',
    icon: '🌙',
    color: '#7B1FA2',
    gradient: 'linear-gradient(135deg, #1A0533, #4A0E78)',
    desc: 'After hours vibes',
    artistIds: ['khaled', 'cheb-hasni', 'cheb-mami', 'zahouania', 'bilal', 'cheb-rimi', 'cheb-akil'],
  },
  {
    id: 'workout',
    name: 'Workout',
    icon: '💪',
    color: '#00ACC1',
    gradient: 'linear-gradient(135deg, #00ACC1, #006064)',
    desc: 'Push your limits',
    artistIds: ['lotfi-dz', 'didine', 'tiba'],
  },
  {
    id: 'deep-focus',
    name: 'Deep Focus',
    icon: '🎯',
    color: '#388E3C',
    gradient: 'linear-gradient(135deg, #1B5E20, #388E3C)',
    desc: 'Stay in the zone',
    artistIds: ['idir', 'lounis', 'matoub', 'taos'],
  },
  {
    id: 'chill-vibes',
    name: 'Chill Vibes',
    icon: '😌',
    color: '#C8A45C',
    gradient: 'linear-gradient(135deg, #C8A45C, #5D4037)',
    desc: 'Relax and unwind',
    artistIds: ['tamtam', 'groupe-douli'],
  },
  {
    id: 'road-trip',
    name: 'Road Trip',
    icon: '🚗',
    color: '#D32F2F',
    gradient: 'linear-gradient(135deg, #D32F2F, #F5A623)',
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

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  const activeMoodTracks = selectedMood ? moodTracks[selectedMood.id] || [] : [];

  return (
    <section className="section mood-section">
      <div className="section__head mood-section__head">
        <div>
          <span className="section__title mood-section__title">Mood</span>
          <span className="section__count">playlists</span>
        </div>
      </div>

      <div className="mood-scroll">
        {MOODS.map((mood) => (
          <div
            key={mood.id}
            className="mood-card"
            style={{ background: mood.gradient }}
            onClick={() => handleMoodClick(mood)}
          >
            <div className="mood-card__glow" />
            <span className="mood-card__icon">{mood.icon}</span>
            <div className="mood-card__name">{mood.name}</div>
            <div className="mood-card__desc">{mood.desc} · {moodTracks[mood.id]?.length || 0} tracks</div>
            <button
              className="mood-card__play"
              onClick={(e) => {
                e.stopPropagation();
                const tracks = moodTracks[mood.id];
                if (tracks && tracks.length > 0) {
                  playTrack(tracks[0]);
                }
                setSelectedMood(mood);
              }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Mood Tracks Panel */}
      {selectedMood && (
        <div className="mood-tracks-overlay" onClick={() => setSelectedMood(null)}>
          <div className="mood-tracks-backdrop" />
          <div className="mood-tracks-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mood-tracks-header" style={{ borderBottomColor: selectedMood.color + '33' }}>
              <span className="mood-tracks-header__icon">{selectedMood.icon}</span>
              <div className="mood-tracks-header__info">
                <div className="mood-tracks-header__title">{selectedMood.name}</div>
                <div className="mood-tracks-header__count">
                  {activeMoodTracks.length} tracks · {selectedMood.desc}
                </div>
              </div>
              <button className="mood-tracks-header__close" onClick={() => setSelectedMood(null)}>
                ✕
              </button>
            </div>

            <div className="mood-tracks-list">
              {activeMoodTracks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state__icon">◌</div>
                  <div className="empty-state__text">No tracks found for this mood</div>
                </div>
              ) : (
                activeMoodTracks.map((track, i) => (
                  <div
                    key={track.id}
                    className={`mood-track-row ${isActive(track.id) ? 'mood-track-row--active' : ''}`}
                    onClick={() => playTrack(track)}
                    style={{ animationDelay: `${i * 0.025}s` }}
                  >
                    <span className="mood-track-row__num">{i + 1}</span>
                    <img className="mood-track-row__img" src={track.image} alt={track.title} loading="lazy" />
                    <div className="mood-track-row__info">
                      <div className="mood-track-row__title">
                        {isActive(track.id) && <span className="mood-track-row__indicator" />}
                        {track.title}
                      </div>
                      <div className="mood-track-row__artist">{track.artist}</div>
                    </div>
                    <span className="mood-track-row__duration">{track.duration}</span>
                    <div className="mood-track-row__actions">
                      <button className="mood-track-row__action" onClick={(e) => { e.stopPropagation(); playTrack(track); }}>
                        {isActive(track.id) ? '⏸' : '▶'}
                      </button>
                    </div>
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
