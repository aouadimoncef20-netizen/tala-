import React from 'react';
import { ALBUMS, TRACKS, ARTISTS } from '../data/athir-data';
import CommentSection from './CommentSection';
import './AlbumDetail.css';

const AlbumDetail = ({ albumId, onPlay, currentTrack, isPlaying, onOpenArtist }) => {
  const album = ALBUMS.find(a => a.id === albumId);
  if (!album) return <div className="empty-state"><div className="empty-state__text">Album not found</div></div>;

  const artist = album.artistId ? ARTISTS.find(a => a.id === album.artistId) : null;
  const albumTracks = album.artistId
    ? TRACKS.filter(t => t.artistId === album.artistId && t.album === album.title)
    : TRACKS.filter(t => t.album === album.title);
  const isTrackActive = (id) => currentTrack?.id === id && isPlaying;

  return (
    <div className="album">
      {/* Hero */}
      <div className="album__hero">
        <div className="album__hero-bg" style={{ background: `linear-gradient(180deg, ${album.color}33 0%, var(--bg-primary) 100%)` }} />
        <img className="album__cover" src={album.image} alt={album.title} />
        <div className="album__info">
          <span className="album__label">Album</span>
          <h1 className="album__title">{album.title}</h1>
          {artist && (
            <span className="album__artist" onClick={() => onOpenArtist?.(artist.id)}>
              {artist.name}
            </span>
          )}
          <div className="album__meta">
            <span>{album.year}</span>
            <span className="album__dot">·</span>
            <span>{album.tracks} tracks</span>
          </div>
          <button className="album__play-btn" onClick={() => albumTracks.length > 0 && onPlay({ ...albumTracks[0], podcastName: artist?.name, podcastId: artist?.id })}>
            ▶ Play Album
          </button>
        </div>
      </div>

      {/* Tracklist */}
      <section className="section" style={{ marginTop: 24 }}>
        <div className="section__head">
          <span className="section__title">Tracklist</span>
          <span className="section__count">{albumTracks.length} tracks</span>
        </div>
        {albumTracks.length === 0 ? (
          <div className="empty-state" style={{ padding: 40 }}>
            <div className="empty-state__text">No tracks listed for this album</div>
          </div>
        ) : (
          <div className="track-list">
            {albumTracks.map((track, i) => (
              <div
                key={track.id}
                className={`track-row ${isTrackActive(track.id) ? 'track-row--active' : ''}`}
                onClick={() => onPlay({ ...track, podcastName: artist?.name, podcastId: artist?.id })}
              >
                <span className="track-row__num">{i + 1}</span>
                <div className="track-row__info">
                  <div className="track-row__title">
                    {isTrackActive(track.id) && <span className="track-row__indicator" />}
                    {track.title}
                  </div>
                </div>
                <span className="track-row__duration">{track.duration}</span>
                <div className="track-row__actions">
                  <button className="track-row__action">
                    {isTrackActive(track.id) ? '⏸' : '▶'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <CommentSection contentId={album.id} contentType="album" title={album.title} />
    </div>
  );
};

export default AlbumDetail;
