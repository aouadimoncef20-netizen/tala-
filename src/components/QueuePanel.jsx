import React from 'react';
import './QueuePanel.css';

const QueuePanel = ({ queue, currentTrack, onRemoveFromQueue, onClearQueue, onPlayItem }) => {
  if (queue.length === 0 && !currentTrack) return null;

  return (
    <div className="queue-panel">
      <div className="queue-panel__header">
        <span className="queue-panel__title">Now Playing</span>
        {queue.length > 0 && (
          <button className="queue-panel__clear" onClick={onClearQueue}>Clear</button>
        )}
      </div>

      {currentTrack && (
        <div className="queue-panel__current">
          <div className="queue-panel__current-img" style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-amber))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0C0F14', fontWeight: 700, fontSize: 12 }}>
            ▶
          </div>
          <div className="queue-panel__current-info">
            <span className="queue-panel__current-title">{currentTrack.title}</span>
            <span className="queue-panel__current-artist">{currentTrack.podcastName || currentTrack.artist}</span>
          </div>
        </div>
      )}

      {queue.length > 0 && (
        <>
          <div className="queue-panel__header" style={{ marginTop: 12 }}>
            <span className="queue-panel__title">Up Next ({queue.length})</span>
          </div>
          <div className="queue-panel__list">
            {queue.map((item, i) => (
              <div key={`q-${i}`} className="queue-panel__item">
                <span className="queue-panel__item-num">{i + 1}</span>
                <div className="queue-panel__item-info">
                  <span className="queue-panel__item-title">{item.title}</span>
                  <span className="queue-panel__item-artist">{item.podcastName || item.artist}</span>
                </div>
                <div className="queue-panel__item-actions">
                  <button className="queue-panel__item-btn" onClick={() => onPlayItem?.(item)} title="Play now">▶</button>
                  <button className="queue-panel__item-btn" onClick={() => onRemoveFromQueue?.(i)} title="Remove">✕</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QueuePanel;
