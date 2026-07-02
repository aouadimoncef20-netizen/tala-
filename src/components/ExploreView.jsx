import React, { useState } from 'react';
import { ARTISTS } from '../data/artists';
import { TRACKS } from '../data/tracks';
import { GENRES } from '../data/genres';
import ShareMenu from './ShareMenu';
import ContextMenu from './ContextMenu';
import TrackRow from './TrackRow';
import usePlayerStore from '../stores/playerStore';
import useUIStore from '../stores/uiStore';
import useLibraryStore from '../stores/libraryStore';
import { createToast } from './Toast';
import './MainContent.css';

const TRACKS_PER_PAGE = 50;

const ExploreView = () => {
  const { currentTrack, isPlaying, playOrToggle, addToQueue } = usePlayerStore();
  const { searchQuery, addToast } = useUIStore();
  const { likedTracks, toggleLike } = useLibraryStore();
  const [activeGenre, setActiveGenre] = useState(null);
  const [shareTrack, setShareTrack] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [visibleCount, setVisibleCount] = useState(TRACKS_PER_PAGE);

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

  const visibleTracks = filteredTracks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTracks.length;

  // Reset pagination when filters change
  React.useEffect(() => {
    setVisibleCount(TRACKS_PER_PAGE);
  }, [searchQuery, activeGenre]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + TRACKS_PER_PAGE, filteredTracks.length));
  };

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
            {visibleTracks.map((track, i) => (
              <div
                key={track.id}
                onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY, track: { ...track, podcastName: track.artist, podcastId: track.artistId } }); }}
              >
                <TrackRow
                  track={track}
                  index={i}
                  isActive={currentTrack?.id === track.id && isPlaying}
                  onPlay={(t) => playOrToggle({ ...t, podcastName: t.artist, podcastId: t.artistId })}
                  onToggleLike={(id) => {
                    const wasLiked = toggleLike(id);
                    addToast(createToast(wasLiked ? 'removed' : 'liked', wasLiked ? 'Removed from likes' : 'Added to likes', ''));
                  }}
                  isLiked={likedTracks?.includes(track.id)}
                  onShare={setShareTrack}
                />
              </div>
            ))}
          </div>
        )}

        {/* Load More button */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button
              className="section__more"
              onClick={handleLoadMore}
              style={{ padding: '8px 24px', fontSize: 12 }}
            >
              Load More ({filteredTracks.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* Share Menu */}
        {shareTrack && (
          <ShareMenu track={shareTrack} onClose={() => setShareTrack(null)} onToast={(type, title, msg) => addToast(createToast(type, title, msg))} />
        )}

        {/* Context Menu */}
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            track={contextMenu.track}
            onClose={() => setContextMenu(null)}
          />
        )}
      </section>
    </div>
  );
};

export default ExploreView;
