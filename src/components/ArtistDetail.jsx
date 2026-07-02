import React from 'react';
import { ARTISTS } from '../data/artists';
import { TRACKS } from '../data/tracks';
import { ALBUMS } from '../data/albums';
import CommentSection from './CommentSection';
import usePlayerStore from '../stores/playerStore';
import useUIStore from '../stores/uiStore';
import { generateRadioStream } from '../data/recommendations';
import './ArtistDetail.css';

const ArtistDetail = ({ artistId }) => {
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const playOrToggle = usePlayerStore(s => s.playOrToggle);
  const startRadio = usePlayerStore(s => s.startRadio);
  const setSelectedAlbum = useUIStore(s => s.setSelectedAlbum);

  const artist = ARTISTS.find(a => a.id === artistId);
  if (!artist) return <div className="empty-state"><div className="empty-state__text">Artist not found</div></div>;

  const tracks = TRACKS.filter(t => t.artistId === artistId);
  const albums = ALBUMS.filter(a => a.artistId === artistId);
  const isTrackActive = (id) => currentTrack?.id === id && isPlaying;

  const handleStartRadio = () => {
    if (tracks.length > 0) {
      const stream = generateRadioStream(tracks[0].id, 20);
      if (stream.length > 0) startRadio(stream);
    }
  };

  return (
    <div className="artist">
      {/* Hero */}
      <div className="artist__hero">
        <div className="artist__hero-bg" style={{ background: `linear-gradient(180deg, ${artist.color}33 0%, var(--bg-primary) 100%)` }} />
        <img className="artist__image" src={artist.image} alt={artist.name} />
        <div className="artist__info">
          <span className="artist__label">Artist</span>
          <h1 className="artist__name">{artist.name}</h1>
          <div className="artist__meta">
            <span>{artist.genre}</span>
            <span className="artist__dot">·</span>
            <span>{artist.followers} followers</span>
          </div>
          <p className="artist__desc">{artist.desc}</p>
          <button className="artist__play-btn" onClick={() => tracks.length > 0 && playOrToggle({ ...tracks[0], podcastName: artist.name, podcastId: artist.id })}>
            ▶ Play
          </button>
          <button className="artist__radio-btn" onClick={handleStartRadio} title="Start artist radio">
            📻 Start Radio
          </button>
        </div>
      </div>

      {/* Popular Tracks */}
      <section className="section" style={{ marginTop: 24 }}>
        <div className="section__head">
          <span className="section__title">Popular</span>
        </div>
        <div className="track-list">
          {tracks.map((track, i) => (
            <div
              key={track.id}
              className={`track-row ${isTrackActive(track.id) ? 'track-row--active' : ''}`}
              onClick={() => playOrToggle({ ...track, podcastName: artist.name, podcastId: artist.id })}
            >
              <span className="track-row__num">{i + 1}</span>
              <img className="track-row__img" src={track.image} alt={track.title} loading="lazy" />
              <div className="track-row__info">
                <div className="track-row__title">
                  {isTrackActive(track.id) && <span className="track-row__indicator" />}
                  {track.title}
                </div>
                <div className="track-row__artist">{track.album}</div>
              </div>
              <span className="track-row__duration">{track.duration}</span>
              <div className="track-row__actions">
                <button className="track-row__action" onClick={(e) => { e.stopPropagation(); playOrToggle({ ...track, podcastName: artist.name, podcastId: artist.id }); }}>
                  {isTrackActive(track.id) ? '⏸' : '▶'}
                </button>
              </div>
            </div>
          ))}
          {tracks.length === 0 && (
            <div className="empty-state" style={{ padding: 40 }}><div className="empty-state__text">No tracks available</div></div>
          )}
        </div>
      </section>

      {/* Albums */}
      {albums.length > 0 && (
        <section className="section" style={{ marginTop: 24 }}>
          <div className="section__head">
            <span className="section__title">Albums</span>
          </div>
          <div className="scroll">
            {albums.map(album => (
              <div key={album.id} className="card" onClick={() => setSelectedAlbum(album.id)}>
                <div className="card__img-wrap">
                  <img className="card__img" src={album.image} alt={album.title} loading="lazy" />
                </div>
                <div className="card__body">
                  <div className="card__title">{album.title}</div>
                  <div className="card__sub">{album.year} · {album.tracks} tracks</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Artists */}
      <section className="section" style={{ marginTop: 24 }}>
        <div className="section__head">
          <span className="section__title">Related Artists</span>
        </div>
        <div className="scroll">
          {ARTISTS.filter(a => a.genre === artist.genre && a.id !== artist.id).slice(0, 6).map(rel => (
            <div key={rel.id} className="card" style={{ minWidth: 130, maxWidth: 130, cursor: 'pointer' }}>
              <div className="card__img-wrap" style={{ borderRadius: '50%', padding: 6, background: 'transparent' }}>
                <img className="card__img" src={rel.image} alt={rel.name} loading="lazy" style={{ borderRadius: '50%' }} />
              </div>
              <div className="card__body" style={{ textAlign: 'center' }}>
                <div className="card__title" style={{ fontSize: 11 }}>{rel.name}</div>
                <div className="card__sub" style={{ fontSize: 9 }}>{rel.genre}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CommentSection contentId={artist.id} contentType="artist" title={artist.name} />
    </div>
  );
};

export default ArtistDetail;
