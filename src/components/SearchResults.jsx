import React, { useState, useMemo } from 'react';
import { ARTISTS, TRACKS, PODCASTS } from '../data/athir-data';
import './MainContent.css';

const TABS = ['Tracks', 'Artists', 'Podcasts'];

const SearchResults = ({ query, onPlay, currentTrack, isPlaying, onOpenArtist, onToggleLike, likedTracks }) => {
  const [tab, setTab] = useState('Tracks');

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return { tracks: [], artists: [], podcasts: [] };

    return {
      tracks: TRACKS.filter(t => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)),
      artists: ARTISTS.filter(a => a.name.toLowerCase().includes(q) || a.genre.toLowerCase().includes(q)),
      podcasts: PODCASTS.filter(p => p.title.toLowerCase().includes(q) || p.host.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)),
    };
  }, [query]);

  const activeList = tab === 'Tracks' ? results.tracks : tab === 'Artists' ? results.artists : results.podcasts;
  const isActive = (id) => currentTrack?.id === id && isPlaying;

  if (!query) {
    return (
      <div>
        <div className="section__head" style={{ marginTop: 16 }}>
          <span className="section__title">Search</span>
        </div>
        <div className="empty-state" style={{ padding: '60px 20px' }}>
          <div className="empty-state__icon">🔍</div>
          <div className="empty-state__text">Type to search tracks, artists, and podcasts</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section__head" style={{ marginTop: 16 }}>
        <span className="section__title">Results for "{query}"</span>
      </div>

      {/* Tabs */}
      <div className="pill-tabs" style={{ marginBottom: 16 }}>
        {TABS.map(t => (
          <button key={t} className={`pill ${tab === t ? 'pill--active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {activeList.length === 0 ? (
        <div className="empty-state" style={{ padding: '40px 20px' }}>
          <div className="empty-state__icon">◌</div>
          <div className="empty-state__text">No {tab.toLowerCase()} found</div>
        </div>
      ) : tab === 'Tracks' ? (
        <div className="track-list">
          {activeList.slice(0, 50).map((track, i) => (
            <div key={track.id} className={`track-row ${isActive(track.id) ? 'track-row--active' : ''}`} onClick={() => onPlay({ ...track, podcastName: track.artist, podcastId: track.artistId })}>
              <span className="track-row__num">{i + 1}</span>
              <div className="track-row__info">
                <div className="track-row__title">
                  {isActive(track.id) && <span className="track-row__indicator" />}
                  {highlightMatch(track.title, query)}
                </div>
                <div className="track-row__artist">{track.artist}</div>
              </div>
              <span className="track-row__duration">{track.duration}</span>
              <div className="track-row__actions">
                <button className="track-row__action" onClick={(e) => { e.stopPropagation(); onToggleLike?.(track.id); }}>
                  {likedTracks?.includes(track.id) ? '♥' : '♡'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : tab === 'Artists' ? (
        <div className="scroll">
          {activeList.map(artist => (
            <div key={artist.id} className="card" style={{ minWidth: 140, maxWidth: 140, cursor: 'pointer' }} onClick={() => onOpenArtist?.(artist.id)}>
              <div className="card__img-wrap" style={{ borderRadius: '50%', padding: 6, background: 'transparent' }}>
                <div className="card__img" style={{ borderRadius: '50%', background: `linear-gradient(135deg, ${artist.color}, ${artist.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, width: '100%', height: '100%', aspectRatio: 1 }}>
                  {artist.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
              </div>
              <div className="card__body" style={{ textAlign: 'center' }}>
                <div className="card__title" style={{ fontSize: 11 }}>{artist.name}</div>
                <div className="card__sub" style={{ fontSize: 9 }}>{artist.genre}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="scroll">
          {activeList.map(pod => (
            <div key={pod.id} className="card" style={{ cursor: 'pointer' }}>
              <div className="card__img-wrap">
                <div className="card__img" style={{ background: `linear-gradient(135deg, ${pod.color}, ${pod.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>
                  {pod.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
              </div>
              <div className="card__body">
                <div className="card__title">{pod.title}</div>
                <div className="card__sub">{pod.host} · {pod.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Highlight matching text
const highlightMatch = (text, query) => {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong style={{ color: 'var(--accent)' }}>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  );
};

export default SearchResults;
