import React from 'react';
import { ARTISTS, TRACKS, AUDIOBOOKS, PODCASTS } from '../data/athir-data';
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

const ProfileView = ({ likedTracks, onPlay, currentTrack, isPlaying, recentTracks }) => {
  const recent = recentTracks || TRACKS.slice(0, 8);
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
              <span className="profile__stat-label">Followers</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-num">{PROFILE.stats.following}</span>
              <span className="profile__stat-label">Following</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-num">{liked.length}</span>
              <span className="profile__stat-label">Liked</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-num">{PROFILE.joinDate}</span>
              <span className="profile__stat-label">Joined</span>
            </div>
          </div>
        </div>
      </div>

      {/* Liked Tracks */}
      <section className="section">
        <div className="section__head">
          <span className="section__title">Liked Tracks</span>
          <span className="section__count">{liked.length}</span>
        </div>
        {liked.length === 0 ? (
          <div className="empty-state" style={{ padding: '40px 20px' }}>
            <div className="empty-state__icon">♡</div>
            <div className="empty-state__text">No liked tracks yet</div>
          </div>
        ) : (
          <div className="track-list">
            {liked.map((track, i) => (
              <div
                key={track.id}
                className={`track-row ${currentTrack?.id === track.id && isPlaying ? 'track-row--active' : ''}`}
                onClick={() => onPlay({ ...track, podcastName: track.artist, podcastId: track.artistId })}
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
          <span className="section__title">Recently Played</span>
        </div>
        <div className="scroll">
          {recent.slice(0, 8).map((track, i) => (
            <div
              key={`recent-${i}`}
              className="card"
              onClick={() => onPlay({ ...track, podcastName: track.artist, podcastId: track.artistId })}
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
