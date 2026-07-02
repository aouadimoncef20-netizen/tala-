import { TRACKS } from './tracks';
import { ARTISTS } from './artists';
import { GENRES } from './genres';
import { ALBUMS } from './albums';

// Build genre mapping
const ARTIST_GENRE_MAP = {};
ARTISTS.forEach(a => { ARTIST_GENRE_MAP[a.id] = a.genre; });

// Build artist-to-tracks mapping
const ARTIST_TRACKS = {};
TRACKS.forEach(t => {
  if (!ARTIST_TRACKS[t.artistId]) ARTIST_TRACKS[t.artistId] = [];
  ARTIST_TRACKS[t.artistId].push(t);
});

// Build genre-to-tracks mapping
const GENRE_TRACKS = {};
TRACKS.forEach(t => {
  const genre = ARTIST_GENRE_MAP[t.artistId] || 'Other';
  if (!GENRE_TRACKS[genre]) GENRE_TRACKS[genre] = [];
  GENRE_TRACKS[genre].push(t);
});

// 1. Content-based: "More from this artist"
export function getMoreFromArtist(artistId, limit = 5) {
  return (ARTIST_TRACKS[artistId] || []).slice(0, limit);
}

// 2. "Fans also like" — same genre, different artists
export function getFansAlsoLike(trackId, limit = 8) {
  const track = TRACKS.find(t => t.id === trackId);
  if (!track) return [];
  const genre = ARTIST_GENRE_MAP[track.artistId];
  if (!genre) return [];
  // Get tracks from same genre but different artist, excluding current track
  const sameGenre = GENRE_TRACKS[genre] || [];
  return sameGenre
    .filter(t => t.artistId !== track.artistId && t.id !== trackId)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

// 3. Trending tracks (most "popular" — simulated by random)
export function getTrendingTracks(limit = 10) {
  return [...TRACKS].sort(() => Math.random() - 0.5).slice(0, limit);
}

// 4. "Recently Added" — last tracks in the array
export function getRecentlyAdded(limit = 10) {
  return TRACKS.slice(-limit).reverse();
}

// 5. "For You" — personalized based on liked tracks
export function getForYou(likedTrackIds = [], limit = 12) {
  if (likedTrackIds.length === 0) {
    // Cold start: return trending + random discovery
    return getTrendingTracks(limit);
  }
  // Find genres user likes
  const likedGenres = new Set();
  likedTrackIds.forEach(id => {
    const t = TRACKS.find(x => x.id === id);
    if (t) likedGenres.add(ARTIST_GENRE_MAP[t.artistId]);
  });
  // Find artists user likes
  const likedArtistIds = new Set();
  likedTrackIds.forEach(id => {
    const t = TRACKS.find(x => x.id === id);
    if (t) likedArtistIds.add(t.artistId);
  });
  // Recommend: same artists first, then same genre, then trending
  const fromArtists = TRACKS.filter(t => likedArtistIds.has(t.artistId) && !likedTrackIds.includes(t.id));
  const fromGenres = TRACKS.filter(t => likedGenres.has(ARTIST_GENRE_MAP[t.artistId]) && !likedTrackIds.includes(t.id) && !likedArtistIds.has(t.artistId));
  const trending = getTrendingTracks(limit);

  const combined = [...fromArtists, ...fromGenres, ...trending];
  // Deduplicate by id
  const seen = new Set();
  return combined.filter(t => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  }).slice(0, limit);
}

// 6. Smart Radio — given a seed track, generate a radio stream
export function generateRadioStream(seedTrackId, length = 20) {
  const track = TRACKS.find(t => t.id === seedTrackId);
  if (!track) return getTrendingTracks(length);

  const genre = ARTIST_GENRE_MAP[track.artistId];
  const sameGenre = GENRE_TRACKS[genre] || [];

  // Mix: 40% same genre, 30% related genres, 30% random
  const genreTracks = sameGenre
    .filter(t => t.id !== seedTrackId)
    .sort(() => Math.random() - 0.5);

  const otherTracks = TRACKS
    .filter(t => ARTIST_GENRE_MAP[t.artistId] !== genre)
    .sort(() => Math.random() - 0.5);

  const radio = [];
  for (let i = 0; i < length; i++) {
    if (i < Math.ceil(length * 0.4) && genreTracks.length > 0) {
      radio.push(genreTracks.shift());
    } else if (otherTracks.length > 0) {
      radio.push(otherTracks.shift());
    } else if (genreTracks.length > 0) {
      radio.push(genreTracks.shift());
    }
  }
  return radio.filter(Boolean);
}

// 7. Mood-based playlists
const MOOD_TRACKS = {
  'morning': [],
  'night': [],
  'workout': [],
  'focus': [],
  'chill': [],
  'roadtrip': [],
};

// Heuristic: assign tracks to moods based on genre
const MOOD_BY_GENRE = {
  'Chaabi': ['morning', 'focus'],
  'Rai': ['chill', 'night', 'roadtrip'],
  'Kabyle': ['morning', 'focus', 'chill'],
  'Rap Dz': ['workout', 'night', 'roadtrip'],
  'Diwan': ['focus', 'chill', 'morning'],
  'Targui': ['chill', 'roadtrip', 'focus'],
  'Kabyle / Traditional': ['morning', 'focus', 'chill'],
};

TRACKS.forEach(t => {
  const genre = ARTIST_GENRE_MAP[t.artistId];
  const moods = MOOD_BY_GENRE[genre] || ['chill'];
  moods.forEach(m => {
    if (MOOD_TRACKS[m]) MOOD_TRACKS[m].push(t);
  });
});

export function getMoodTracks(mood, limit = 15) {
  const tracks = MOOD_TRACKS[mood] || [];
  return tracks.sort(() => Math.random() - 0.5).slice(0, limit);
}

export const MOODS = [
  { key: 'morning', label: 'Morning Energy', icon: '☀️', color: '#F5A623', desc: 'Start your day right' },
  { key: 'night', label: 'Late Night', icon: '🌙', color: '#6A1B9A', desc: 'Wind down the evening' },
  { key: 'workout', label: 'Workout', icon: '💪', color: '#D32F2F', desc: 'Power through your reps' },
  { key: 'focus', label: 'Deep Focus', icon: '🎯', color: '#4A9BAA', desc: 'Concentrate and flow' },
  { key: 'chill', label: 'Chill Vibes', icon: '😌', color: '#5AA87A', desc: 'Relax and unwind' },
  { key: 'roadtrip', label: 'Road Trip', icon: '🚗', color: '#D4875E', desc: 'Music for the drive' },
];

export default {
  getMoreFromArtist,
  getFansAlsoLike,
  getTrendingTracks,
  getRecentlyAdded,
  getForYou,
  generateRadioStream,
  getMoodTracks,
  MOODS,
};
