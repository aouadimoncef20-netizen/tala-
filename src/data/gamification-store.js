const STATS_KEY = 'tala_gamification';

const defaultStats = {
  totalTracksPlayed: 0,
  totalListeningMinutes: 0,
  consecutiveDays: 0,
  lastListenDate: null,
  badges: [],
  currentStreak: 0,
  longestStreak: 0,
  totalLikes: 0,
  totalPlaylists: 0,
};

export const getStats = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STATS_KEY));
    return { ...defaultStats, ...saved };
  } catch {
    return { ...defaultStats };
  }
};

export const recordListen = (durationMinutes) => {
  const stats = getStats();
  stats.totalTracksPlayed += 1;
  stats.totalListeningMinutes += Math.round(durationMinutes || 3);

  const today = new Date().toDateString();
  const lastDate = stats.lastListenDate ? new Date(stats.lastListenDate).toDateString() : null;

  if (lastDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastDate === yesterday) {
      stats.currentStreak += 1;
    } else {
      stats.currentStreak = 1;
    }
    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
  }
  stats.lastListenDate = new Date().toISOString();

  const newBadges = [];
  if (stats.totalTracksPlayed >= 10) newBadges.push({ id: 'early_bird', name: 'Early Bird', icon: '🐦', desc: 'Played 10 tracks' });
  if (stats.totalTracksPlayed >= 100) newBadges.push({ id: 'hundred_club', name: 'Hundred Club', icon: '💯', desc: 'Played 100 tracks' });
  if (stats.totalTracksPlayed >= 500) newBadges.push({ id: 'music_lover', name: 'Music Lover', icon: '🎵', desc: 'Played 500 tracks' });
  if (stats.currentStreak >= 3) newBadges.push({ id: 'streak_3', name: '3-Day Streak', icon: '🔥', desc: 'Listened 3 days in a row' });
  if (stats.currentStreak >= 7) newBadges.push({ id: 'streak_7', name: 'Week Warrior', icon: '📅', desc: 'Listened 7 days in a row' });
  if (stats.currentStreak >= 30) newBadges.push({ id: 'streak_30', name: 'Dedicated', icon: '🏆', desc: 'Listened 30 days in a row' });
  if (stats.totalListeningMinutes >= 600) newBadges.push({ id: 'ten_hours', name: 'Ten Hours', icon: '⏰', desc: '10 hours of listening' });
  if (stats.totalListeningMinutes >= 6000) newBadges.push({ id: 'hundred_hours', name: 'Hundred Hours', icon: '🌟', desc: '100 hours of listening' });

  stats.badges = newBadges;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  return stats;
};

export const recordLike = () => {
  const stats = getStats();
  stats.totalLikes += 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const recordPlaylist = () => {
  const stats = getStats();
  stats.totalPlaylists += 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};
