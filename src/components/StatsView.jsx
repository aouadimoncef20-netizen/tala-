import React from 'react';
import { TRACKS } from '../data/tracks';
import { ARTISTS } from '../data/artists';
import useLibraryStore from '../stores/libraryStore';
import './StatsView.css';

const StatsView = () => {
  const likedTrackIds = useLibraryStore(s => s.likedTracks);
  const likedTracks = TRACKS.filter(t => likedTrackIds.includes(t.id));

  // Total liked
  const totalLiked = likedTracks.length;

  // Simulated listening time: each track ~3 min
  const listeningMinutes = totalLiked * 3;
  const listeningHours = Math.floor(listeningMinutes / 60);
  const listeningMins = listeningMinutes % 60;

  // Top genres from liked tracks
  const genreCounts = {};
  likedTracks.forEach(t => {
    const artist = ARTISTS.find(a => a.id === t.artistId);
    const genre = artist?.genre || 'Other';
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });
  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxGenreCount = sortedGenres.length > 0 ? sortedGenres[0][1] : 1;

  // Top artists from liked tracks
  const artistCounts = {};
  likedTracks.forEach(t => {
    artistCounts[t.artistId] = (artistCounts[t.artistId] || 0) + 1;
  });
  const sortedArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([artistId, count]) => {
      const artist = ARTISTS.find(a => a.id === artistId);
      return { artist, count };
    })
    .filter(item => item.artist);

  // Genre color map
  const genreColors = {
    'Rai': '#D32F2F',
    'Chaabi': '#006B3F',
    'Kabyle': '#E65100',
    'Kabyle / Traditional': '#7B1FA2',
    'Rap Dz': '#00ACC1',
    'Diwan': '#C8A45C',
    'Targui': '#C62828',
  };

  return (
    <div className="stats">
      <div className="stats__header">
        <h1 className="stats__title">Your Stats</h1>
        <p className="stats__subtitle">Listening activity overview</p>
      </div>

      {/* Stat Cards */}
      <div className="stats__grid">
        <div className="stats__card stats__card--liked">
          <div className="stats__card-icon">â™¥</div>
          <div className="stats__card-value">{totalLiked}</div>
          <div className="stats__card-label">Liked Tracks</div>
        </div>
        <div className="stats__card stats__card--time">
          <div className="stats__card-icon">â±</div>
          <div className="stats__card-value">
            {listeningHours > 0 ? `${listeningHours}h ` : ''}{listeningMins}m
          </div>
          <div className="stats__card-label">Listening Time</div>
        </div>
        <div className="stats__card stats__card--artists">
          <div className="stats__card-icon">ðŸŽ¤</div>
          <div className="stats__card-value">{sortedArtists.length}</div>
          <div className="stats__card-label">Top Artists</div>
        </div>
        <div className="stats__card stats__card--genres">
          <div className="stats__card-icon">ðŸŽµ</div>
          <div className="stats__card-value">{sortedGenres.length}</div>
          <div className="stats__card-label">Top Genres</div>
        </div>
      </div>

      {/* Top Genres */}
      <section className="section">
        <div className="section__head">
          <span className="section__title">Top Genres</span>
        </div>
        {sortedGenres.length === 0 ? (
          <div className="empty-state" style={{ padding: '30px 20px' }}>
            <div className="empty-state__text">Like some tracks to see your genre breakdown</div>
          </div>
        ) : (
          <div className="stats__genre-list">
            {sortedGenres.map(([genre, count]) => {
              const color = genreColors[genre] || '#5AA87A';
              const pct = (count / maxGenreCount) * 100;
              return (
                <div key={genre} className="stats__genre-item">
                  <div className="stats__genre-info">
                    <span className="stats__genre-name">{genre}</span>
                    <span className="stats__genre-count">{count} tracks</span>
                  </div>
                  <div className="stats__genre-bar-bg">
                    <div
                      className="stats__genre-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Top Artists */}
      <section className="section">
        <div className="section__head">
          <span className="section__title">Top Artists</span>
        </div>
        {sortedArtists.length === 0 ? (
          <div className="empty-state" style={{ padding: '30px 20px' }}>
            <div className="empty-state__text">Like some tracks to see your top artists</div>
          </div>
        ) : (
          <div className="stats__artist-list">
            {sortedArtists.map(({ artist, count }, i) => (
              <div key={artist.id} className="stats__artist-item">
                <span className="stats__artist-rank">{i + 1}</span>
                <img className="stats__artist-img" src={artist.image} alt={artist.name} loading="lazy" />
                <div className="stats__artist-info">
                  <span className="stats__artist-name">{artist.name}</span>
                  <span className="stats__artist-genre">{artist.genre}</span>
                </div>
                <span className="stats__artist-count">{count} {count === 1 ? 'track' : 'tracks'}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StatsView;

