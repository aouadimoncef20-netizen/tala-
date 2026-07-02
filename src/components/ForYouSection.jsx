import React from 'react';
import { getForYou, getRecentlyAdded, getTrendingTracks } from '../data/recommendations';
import usePlayerStore from '../stores/playerStore';
import useLibraryStore from '../stores/libraryStore';

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

  const renderScroll = (tracks, title, subtitle) => (
    <section className="px-5 mt-7">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-base font-bold section-title text-[var(--text-primary)]">{title}</span>
          <span className="text-[11px] text-[var(--text-subdued)] ml-2">{subtitle}</span>
        </div>
      </div>
      {tracks.length === 0 ? (
        <div className="py-5 text-center">
          <div className="text-sm text-[var(--text-subdued)]">Like some tracks to get personalized recommendations</div>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {tracks.map((track, i) => (
            <div
              key={track.id}
              className={`min-w-[120px] max-w-[120px] cursor-pointer group animate-fade-in-up ${isActive(track.id) ? 'opacity-100' : ''}`}
              onClick={() => playTrack(track)}
              tabIndex={0} role="button"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playTrack(track); } }}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="relative rounded-[var(--radius-md)] overflow-hidden mb-1.5">
                <img className="w-full aspect-square object-cover" src={track.image} alt={track.title} loading="lazy" />
                <div className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-md bg-[#D4875E] flex items-center justify-center shadow transition-transform duration-200 hover:scale-110">
                  {isActive(track.id) ? (
                    <i className="fa-solid fa-pause text-[#0C0F14] text-xs"></i>
                  ) : (
                    <i className="fa-solid fa-play text-[#0C0F14] text-xs ml-0.5"></i>
                  )}
                </div>
                {isActive(track.id) && (
                  <div className="absolute bottom-1.5 left-1.5 flex items-end gap-[2px] h-3">
                    {[1,2,3,4].map(i => (
                      <span key={i} className="w-[2px] bg-[#D4875E] rounded-sm eq-bar" style={{height:'6px', animation:'eq 0.8s ease-in-out infinite alternate', animationDelay:`${i*0.2}s`}}></span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{track.title}</div>
              <div className="text-[9px] text-[var(--text-subdued)] truncate">{track.artist}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div>
      {renderScroll(forYouTracks, 'Made for You', 'personalized picks')}
      {renderScroll(recentlyAdded, 'Recently Added', 'fresh tracks')}
      {renderScroll(trendingTracks, 'Trending', 'popular now')}
    </div>
  );
};

export default ForYouSection;
