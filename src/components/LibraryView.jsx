import React, { useState } from 'react';
import { TRACKS } from '../data/tracks';
import { PODCASTS } from '../data/podcasts';
import usePlayerStore from '../stores/playerStore';
import useLibraryStore from '../stores/libraryStore';
import './MainContent.css';

const TABS = ['Favorites', 'Podcasts', 'Recent'];

const LibraryView = () => {
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const playOrToggle = usePlayerStore(s => s.playOrToggle);
  const likedTracks = useLibraryStore(s => s.likedTracks);
  const [tab, setTab] = useState('Favorites');
  const likedItems = TRACKS.filter(t => likedTracks?.includes(t.id));

  return (
    <div>
      <div className="hero-mini" style={{ borderBottom: 'none' }}>
        <div className="hero-mini__info">
          <div className="hero-mini__type">▤ Your Library</div>
          <h1 className="hero-mini__title">Collection</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="pill-tabs" style={{ marginBottom: 20 }}>
        {TABS.map(t => (
          <button key={t} className={`pill ${tab === t ? 'pill--active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Favorites' && (
        <section className="section">
          <div className="section__head">
            <span className="section__title">Favorites</span>
            <span className="section__count">{likedItems.length} tracks</span>
          </div>
          {likedItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">♡</div>
              <div className="empty-state__text">No favorites yet</div>
              <div className="empty-state__sub">Tap ♡ on any track to save it here</div>
            </div>
          ) : (
            <div className="track-list">
              {likedItems.map((track, i) => (
                <div key={track.id} className={`track-row ${currentTrack?.id === track.id && isPlaying ? 'track-row--active' : ''}`} onClick={() => playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId })}>
                  <span className="track-row__num">{i + 1}</span>
                  <img className="track-row__img" src={track.image} alt={track.title} loading="lazy" />
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
      )}

      {tab === 'Podcasts' && (
        <section className="section">
          <div className="section__head">
            <span className="section__title">Subscribed</span>
          </div>
          <div className="scroll">
            {PODCASTS.slice(0, 6).map(pod => (
              <div key={pod.id} className="card">
                <div className="card__img-wrap">
                  <img className="card__img" src={pod.image} alt={pod.title} loading="lazy" />
                </div>
                <div className="card__body">
                  <div className="card__title">{pod.title}</div>
                  <div className="card__sub">{pod.episodes} episodes</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'Recent' && (
        <section className="section">
          <div className="section__head">
            <span className="section__title">Recently Played</span>
          </div>
          <div className="track-list">
            {TRACKS.slice(0, 8).map((track, i) => (
              <div key={track.id} className={`track-row ${currentTrack?.id === track.id && isPlaying ? 'track-row--active' : ''}`} onClick={() => playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId })}>
                <span className="track-row__num">{i + 1}</span>
                <img className="track-row__img" src={track.image} alt={track.title} loading="lazy" />
                <div className="track-row__info">
                  <div className="track-row__title">{track.title}</div>
                  <div className="track-row__artist">{track.artist}</div>
                </div>
                <span className="track-row__duration">{track.duration}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default LibraryView;
