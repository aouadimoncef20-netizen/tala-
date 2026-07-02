import React from 'react';
import { getForYou, getRecentlyAdded, getTrendingTracks } from '../data/recommendations';
import usePlayerStore from '../stores/playerStore';
import useLibraryStore from '../stores/libraryStore';
import './ForYouSection.css';

const ForYouSection = () => {
  const likedTrackIds = useLibraryStore(s => s.likedTracks);
  const currentTrack = usePlayerStore(s => s.currentTrack);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const playOrToggle = usePlayerStore(s => s.playOrToggle);
  const forYouTracks = getForYou(likedTrackIds, 8);
  const recentlyAdded = getRecentlyAdded(8);
  const trendingTracks = getTrendingTracks(8);

  const isActive = (id) => currentTrack?.id === id && isPlaying;

  const playTrack = (track) => {
    playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId });
  };

  const renderScroll = (tracks) => (
    <div className="foryou-scroll">
      {tracks.map((track, i) => (
        <div
          key={track.id}
          className={`foryou-card ${isActive(track.id) ? 'foryou-card--active' : ''}`}
          onClick={() => playTrack(track)}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playTrack(track); } }}
          style={{ animationDelay: `${i * 0.04}s` }}
        >
          <div className="foryou-card__img-wrap">
            <img className="foryou-card__img" src={track.image} alt={track.title} loading="lazy" />
            <div className="foryou-card__play">
              {isActive(track.id) ? (
                <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
              )}
            </div>
            {isActive(track.id) && <div className="foryou-card__eq"><span></span><span></span><span></span><span></span></div>}
          </div>
          <div className="foryou-card__body">
            <div className="foryou-card__title">{track.title}</div>
            <div className="foryou-card__artist">{track.artist}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="foryou-section">
      {/* Made for You */}
      <section className="section">
        <div className="section__head">
          <div>
            <span className="section__title">Made for You</span>
            <span className="section__count">personalized picks</span>
          </div>
        </div>
        {forYouTracks.length === 0 ? (
          <div className="empty-state" style={{ padding: '20px' }}>
            <div className="empty-state__text">Like some tracks to get personalized recommendations</div>
          </div>
        ) : (
          renderScroll(forYouTracks)
        )}
      </section>

      {/* Recently Added */}
      <section className="section">
        <div className="section__head">
          <div>
            <span className="section__title">Recently Added</span>
            <span className="section__count">fresh tracks</span>
          </div>
        </div>
        {renderScroll(recentlyAdded)}
      </section>

      {/* Trending */}
      <section className="section">
        <div className="section__head">
          <div>
            <span className="section__title">Trending</span>
            <span className="section__count">popular now</span>
          </div>
        </div>
        {renderScroll(trendingTracks)}
      </section>
    </div>
  );
};

export default ForYouSection;

