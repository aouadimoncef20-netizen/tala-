import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ARTISTS } from '../data/artists';
import { TRACKS } from '../data/tracks';
import { AUDIOBOOKS } from '../data/audiobooks';
import { PODCASTS } from '../data/podcasts';
import { getStats } from '../data/gamification-store';
import BadgesView from './BadgesView';
import LangSwitcher from './LangSwitcher';
import usePlayerStore from '../stores/playerStore';
import useLibraryStore from '../stores/libraryStore';
import './ProfileView.css';

const PROFILE = {
  name: 'Youcef',
  username: '@youcef_dz',
  avatar: 'Y',
  color: '#D4875E',
  joinDate: 'March 2026',
  bio: 'Rai lover, Chaabi enthusiast, and podcast addict. Exploring Algerian audio culture one track at a time.',
  stats: { followers: 142, following: 89 },
};

const formatMinutes = (mins) => {
  if (mins >= 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  }
  return `${mins}m`;
};

const ProfileView = () => {
  const { t } = useTranslation();
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const playOrToggle = usePlayerStore(s => s.playOrToggle);
  const likedTracks = useLibraryStore(s => s.likedTracks);
  const [gamification, setGamification] = useState(getStats());

  useEffect(() => {
    const interval = setInterval(() => setGamification(getStats()), 2000);
    return () => clearInterval(interval);
  }, []);

  const recent = TRACKS.slice(0, 8);
  const liked = TRACKS.filter(t => likedTracks?.includes(t.id));

  return (
    <div className="profile">
      {/* Header */}
      <div className="profile__hero">
        <div className="profile__hero-bg" style={{ background: `linear-gradient(135deg, ${PROFILE.color}44, ${PROFILE.color}22, var(--bg-primary))` }} />
        <div className="profile__avatar" style={{ background: `linear-gradient(135deg, ${PROFILE.color}, var(--accent-teal))` }}>
          {PROFILE.avatar}
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{PROFILE.name}</h1>
          <span className="profile__username">{PROFILE.username}</span>
          <p className="profile__bio">{PROFILE.bio}</p>
          <div className="profile__stats">
            <div className="profile__stat">
              <span className="profile__stat-num">{PROFILE.stats.followers}</span>
              <span className="profile__stat-label">{t('profile.followers')}</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-num">{PROFILE.stats.following}</span>
              <span className="profile__stat-label">{t('profile.following')}</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-num">{liked.length}</span>
              <span className="profile__stat-label">{t('profile.likedCount')}</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-num">{PROFILE.joinDate}</span>
              <span className="profile__stat-label">{t('profile.joined')}</span>
            </div>
          </div>
          <div className="profile__settings" style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, color: 'var(--text-subdued)', fontWeight: 500 }}>{t('profile.language')}:</span>
            <LangSwitcher />
          </div>
        </div>
      </div>

      {/* Gamification Stats */}
      <section className="section" style={{ marginTop: 24 }}>
        <div className="section__head">
          <span className="section__title">{t('profile.listeningStats') || 'Listening Stats'}</span>
          <span className="section__count">🎮</span>
        </div>
        <div className="profile__gamification">
          <div className="profile__gamification-card">
            <span className="profile__gamification-icon">🎵</span>
            <span className="profile__gamification-value">{gamification.totalTracksPlayed}</span>
            <span className="profile__gamification-label">{t('profile.tracksPlayed') || 'Tracks Played'}</span>
          </div>
          <div className="profile__gamification-card">
            <span className="profile__gamification-icon">⏱️</span>
            <span className="profile__gamification-value">{formatMinutes(gamification.totalListeningMinutes)}</span>
            <span className="profile__gamification-label">{t('profile.listeningTime') || 'Listening Time'}</span>
          </div>
          <div className="profile__gamification-card">
            <span className="profile__gamification-icon">🔥</span>
            <span className="profile__gamification-value">{gamification.currentStreak}</span>
            <span className="profile__gamification-label">{t('profile.dayStreak') || 'Day Streak'}</span>
          </div>
          <div className="profile__gamification-card">
            <span className="profile__gamification-icon">🏆</span>
            <span className="profile__gamification-value">{gamification.longestStreak}</span>
            <span className="profile__gamification-label">{t('profile.bestStreak') || 'Best Streak'}</span>
          </div>
          <div className="profile__gamification-card">
            <span className="profile__gamification-icon">❤️</span>
            <span className="profile__gamification-value">{gamification.totalLikes}</span>
            <span className="profile__gamification-label">{t('profile.likesGiven') || 'Likes Given'}</span>
          </div>
          <div className="profile__gamification-card">
            <span className="profile__gamification-icon">📋</span>
            <span className="profile__gamification-value">{gamification.totalPlaylists}</span>
            <span className="profile__gamification-label">{t('profile.playlists') || 'Playlists'}</span>
          </div>
        </div>
      </section>

      {/* Badges */}
      <BadgesView />

      {/* Liked Tracks */}
      <section className="section" style={{ marginTop: 24 }}>
        <div className="section__head">
          <span className="section__title">{t('library.likedTracks')}</span>
          <span className="section__count">{liked.length}</span>
        </div>
        {liked.length === 0 ? (
          <div className="empty-state" style={{ padding: '40px 20px' }}>
            <div className="empty-state__icon">♡</div>
            <div className="empty-state__text">{t('library.empty')}</div>
          </div>
        ) : (
          <div className="track-list">
            {liked.map((track, i) => (
              <div
                key={track.id}
                className={`track-row ${currentTrack?.id === track.id && isPlaying ? 'track-row--active' : ''}`}
                onClick={() => playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId })}
              >
                <span className="track-row__num">{i + 1}</span>
                <div className="track-row__info">
                  <div className="track-row__title">{track.title}</div>
                  <div className="track-row__artist">{track.artist}</div>
                </div>
                <span className="track-row__duration">{track.duration}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Plays */}
      <section className="section" style={{ marginTop: 24 }}>
        <div className="section__head">
          <span className="section__title">{t('profile.recentlyPlayed')}</span>
        </div>
        <div className="scroll">
          {recent.slice(0, 8).map((track, i) => (
            <div
              key={`recent-${i}`}
              className="card"
              onClick={() => playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId })}
              style={{ minWidth: 130, maxWidth: 130 }}
            >
              <div className="card__img-wrap" style={{ borderRadius: '50%', padding: 4, background: 'transparent' }}>
                <img className="card__img" src={track.image} alt={track.title} loading="lazy" style={{ borderRadius: '50%' }} />
              </div>
              <div className="card__body" style={{ textAlign: 'center' }}>
                <div className="card__title" style={{ fontSize: 11 }}>{track.title}</div>
                <div className="card__sub" style={{ fontSize: 9 }}>{track.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileView;
