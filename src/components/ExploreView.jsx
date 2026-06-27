import React, { useState } from 'react';
import { ARTISTS, TRACKS, GENRES } from '../data/athir-data';
import './MainContent.css';

const ExploreView = ({ searchQuery, onPlay, currentTrack, isPlaying, onToggleLike, likedTracks }) => {
  const [activeGenre, setActiveGenre] = useState(null);

  const filteredTracks = searchQuery
    ? TRACKS.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.artist.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeGenre
    ? TRACKS.filter(t => { const a = ARTISTS.find(x => x.id === t.artistId); return a?.genre === activeGenre; })
    : TRACKS;

  const filteredArtists = searchQuery
    ? ARTISTS.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeGenre
    ? ARTISTS.filter(a => a.genre === activeGenre)
    : ARTISTS;

  return (
    <div>
      <section className="section" style={{ marginTop: 0 }}>
        <div className="section__head">
          <span className="section__title">Explore</span>
        </div>

        {/* Genre chips */}
        <div className="chip-row" style={{ marginBottom: 20 }}>
          <button className={`chip ${!activeGenre ? 'chip--active' : ''}`} onClick={() => setActiveGenre(null)}>All</button>
          {GENRES.map(g => (
            <button
              key={g.name}
              className={`chip ${activeGenre === g.name ? 'chip--active' : ''}`}
              onClick={() => setActiveGenre(g.name)}
              style={activeGenre === g.name ? { background: g.color, borderColor: g.color, color: '#fff' } : {}}
            >
              {g.name}
            </button>
          ))}
        </div>
      </section>

      {/* Artists */}
      <section className="section">
        <div className="section__head">
          <span className="section__title">Artists</span>
          <span className="section__count">{filteredArtists.length}</span>
        </div>
        <div className="scroll">
          {filteredArtists.map(artist => (
            <div key={artist.id} className="card" style={{ minWidth: 130, maxWidth: 130 }}>
              <div className="card__img-wrap" style={{ borderRadius: '50%', padding: 6, background: 'transparent' }}>
                <img className="card__img" src={artist.image} alt={artist.name} loading="lazy" style={{ borderRadius: '50%' }} />
              </div>
              <div className="card__body" style={{ textAlign: 'center' }}>
                <div className="card__title" style={{ fontSize: 11 }}>{artist.name}</div>
                <div className="card__sub" style={{ fontSize: 9 }}>{artist.genre}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="section">
        <div className="section__head">
          <span className="section__title">Tracks</span>
          <span className="section__count">{filteredTracks.length}</span>
        </div>
        {filteredTracks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">◌</div>
            <div className="empty-state__text">No tracks found</div>
          </div>
        ) : (
          <div className="track-list">
            {filteredTracks.map((track, i) => (
              <div
                key={track.id}
                className={`track-row ${currentTrack?.id === track.id && isPlaying ? 'track-row--active' : ''}`}
                onClick={() => onPlay({ ...track, podcastName: track.artist, podcastId: track.artistId })}
              >
                <span className="track-row__num">{i + 1}</span>
                <img className="track-row__img" src={track.image} alt={track.title} loading="lazy" />
                <div className="track-row__info">
                  <div className="track-row__title">
                    {currentTrack?.id === track.id && isPlaying && <span className="track-row__indicator" />}
                    {track.title}
                  </div>
                  <div className="track-row__artist">{track.artist}</div>
                </div>
                <span className="track-row__duration">{track.duration}</span>
                <div className="track-row__actions">
                  <button className="track-row__action" onClick={(e) => { e.stopPropagation(); onToggleLike(track.id); }}>
                    {likedTracks?.includes(track.id) ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExploreView;
