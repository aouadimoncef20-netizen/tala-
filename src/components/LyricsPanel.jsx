import React, { useRef, useEffect, useMemo } from 'react';
import { getLyricsForTrack } from '../data/lyrics';
import './LyricsPanel.css';

/**
 * LyricsPanel — synced, scrolling lyrics display.
 *
 * Props:
 *   trackId     — e.g. "track_khaled_0"
 *   currentTime — current playback position in seconds
 *   isVisible   — whether the panel should be shown
 */
const LyricsPanel = ({ trackId, currentTime, isVisible }) => {
  const containerRef = useRef(null);
  const activeRef = useRef(null);

  const lyrics = useMemo(() => getLyricsForTrack(trackId), [trackId]);

  // Determine the active line index
  const activeIndex = useMemo(() => {
    if (!lyrics || lyrics.length === 0) return -1;
    let idx = 0;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].t <= currentTime) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  }, [lyrics, currentTime]);

  // Auto-scroll to keep the active line centred
  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeEl = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      const offset =
        activeRect.top -
        containerRect.top -
        containerRect.height / 2 +
        activeRect.height / 2;

      container.scrollBy({
        top: offset,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  if (!isVisible) return null;

  return (
    <div className="lyrics-panel" ref={containerRef}>
      {!lyrics || lyrics.length === 0 ? (
        <div className="lyrics-panel__empty">
          <span className="lyrics-panel__empty-icon">♪</span>
          <span className="lyrics-panel__empty-text">
            No lyrics available yet
          </span>
        </div>
      ) : (
        <div className="lyrics-panel__list">
          {lyrics.map((line, i) => {
            const isActive = i === activeIndex;
            // Lines before the active one are "past"
            const isPast = i < activeIndex;
            // Lines after are "future"
            const isFuture = i > activeIndex;

            return (
              <div
                key={i}
                ref={isActive ? activeRef : null}
                className={[
                  'lyrics-panel__line',
                  isActive ? 'lyrics-panel__line--active' : '',
                  isPast ? 'lyrics-panel__line--past' : '',
                  isFuture ? 'lyrics-panel__line--future' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LyricsPanel;
