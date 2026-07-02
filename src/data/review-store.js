const STORAGE_KEY = 'tala_reviews';
const VOTE_KEY = 'tala_review_votes';

export const getReviews = (albumId) => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return all[albumId] || [];
  } catch { return []; }
};

export const addReview = (albumId, { user, rating, text }) => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (!all[albumId]) all[albumId] = [];
  all[albumId].push({
    id: `rev_${Date.now()}`,
    user: user || 'Guest',
    rating,
    text,
    date: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return all[albumId];
};

export const getAverageRating = (albumId) => {
  const reviews = getReviews(albumId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
};

export const voteOnReview = (albumId, reviewId, type) => {
  const votes = JSON.parse(localStorage.getItem(VOTE_KEY) || '{}');
  const key = `${albumId}_${reviewId}`;
  if (!votes[key]) votes[key] = { upvoted: false, downvoted: false };

  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const reviews = all[albumId] || [];
  const review = reviews.find(r => r.id === reviewId);
  if (!review) return;

  if (type === 'upvote') {
    if (votes[key].upvoted) {
      review.upvotes -= 1;
      votes[key].upvoted = false;
    } else {
      review.upvotes += 1;
      votes[key].upvoted = true;
      if (votes[key].downvoted) {
        review.downvotes -= 1;
        votes[key].downvoted = false;
      }
    }
  } else if (type === 'downvote') {
    if (votes[key].downvoted) {
      review.downvotes -= 1;
      votes[key].downvoted = false;
    } else {
      review.downvotes += 1;
      votes[key].downvoted = true;
      if (votes[key].upvoted) {
        review.upvotes -= 1;
        votes[key].upvoted = false;
      }
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  localStorage.setItem(VOTE_KEY, JSON.stringify(votes));
  return reviews;
};

export const getReviewVoteStatus = (albumId, reviewId) => {
  try {
    const votes = JSON.parse(localStorage.getItem(VOTE_KEY) || '{}');
    return votes[`${albumId}_${reviewId}`] || { upvoted: false, downvoted: false };
  } catch { return { upvoted: false, downvoted: false }; }
};
