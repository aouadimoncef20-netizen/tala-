const FOLLOW_KEY = 'tala_following';
const PROFILE_KEY = 'tala_user_profile';

export const getFollowing = () => {
  try {
    return JSON.parse(localStorage.getItem(FOLLOW_KEY) || '[]');
  } catch { return []; }
};

export const toggleFollow = (artistId) => {
  const following = getFollowing();
  const idx = following.indexOf(artistId);
  if (idx >= 0) following.splice(idx, 1);
  else following.push(artistId);
  localStorage.setItem(FOLLOW_KEY, JSON.stringify(following));
  return following;
};

export const isFollowing = (artistId) => {
  return getFollowing().includes(artistId);
};

export const getFollowersCount = (artistId) => {
  // Simulated: base followers + local following count
  // In a real app this would come from an API
  const following = getFollowing();
  const localFollowing = following.filter(id => id === artistId).length;
  return localFollowing;
};

export const getUserProfile = () => {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    name: 'Youcef',
    username: '@youcef_dz',
    avatar: 'Y',
    color: '#D4875E',
    joinDate: 'March 2026',
    bio: 'Rai lover, Chaabi enthusiast, and podcast addict. Exploring Algerian audio culture one track at a time.',
  };
};

export const saveUserProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};
