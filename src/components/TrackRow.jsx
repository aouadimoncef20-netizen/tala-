import React from 'react';

const TrackRow = React.memo(({ track, index, isActive, onPlay, onToggleLike, isLiked, onShare }) => {
  return (
    <div
      className={`track-row ${isActive ? 'track-row--active' : ''}`}
      onClick={() => onPlay(track)}
    >
      <span className="track-row__num">{index + 1}</span>
      <img className="track-row__img" src={track.image} alt={track.title} loading="lazy" />
      <div className="track-row__info">
        <div className="track-row__title">
          {isActive && <span className="track-row__indicator" />}
          {track.title}
        </div>
        <div className="track-row__artist">{track.artist}</div>
      </div>
      <span className="track-row__duration">{track.duration}</span>
      <div className="track-row__actions">
        {onToggleLike && (
          <button className="track-row__action" onClick={(e) => { e.stopPropagation(); onToggleLike(track.id); }}>
            {isLiked ? '♥' : '♡'}
          </button>
        )}
        {onShare && (
          <button className="track-row__action" onClick={(e) => { e.stopPropagation(); onShare(track); }} title="Share">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

export default TrackRow;
