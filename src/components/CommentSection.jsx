import React, { useState, useEffect } from 'react';
import './CommentSection.css';

const STORAGE_KEY = 'tala_comments';
const RATINGS_KEY = 'tala_ratings';

const loadComments = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
};
const saveComments = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
};
const loadRatings = () => {
  try { return JSON.parse(localStorage.getItem(RATINGS_KEY)) || {}; } catch { return {}; }
};
const saveRatings = (data) => {
  try { localStorage.setItem(RATINGS_KEY, JSON.stringify(data)); } catch {}
};

const CommentSection = ({ contentId, contentType = 'track', title = '' }) => {
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState({});
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [hoverStar, setHoverStar] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const storageKey = `${contentType}-${contentId}`;

  useEffect(() => {
    const all = loadComments();
    setComments(all[storageKey] || []);
    const allRatings = loadRatings();
    setRatings(allRatings[storageKey] || {});
  }, [storageKey]);

  const updateComments = (newList) => {
    const all = loadComments();
    all[storageKey] = newList;
    saveComments(all);
    setComments(newList);
  };

  const userRating = ratings.userRating || 0;
  const avgRating = ratings.total && ratings.count ? (ratings.total / ratings.count) : 0;

  const handleRate = (star) => {
    const newRatings = {
      total: (ratings.total || 0) + star - (ratings.userRating || 0),
      count: (ratings.count || 0) + (ratings.userRating ? 0 : 1),
      userRating: star,
    };
    const all = loadRatings();
    all[storageKey] = newRatings;
    saveRatings(all);
    setRatings(newRatings);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newEntry = {
      id: Date.now(),
      author: authorName.trim() || 'Anonymous',
      text: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      likedBy: [],
    };
    updateComments([newEntry, ...comments]);
    setNewComment('');
    setShowForm(false);
  };

  const handleLike = (commentId) => {
    const updated = comments.map(c => {
      if (c.id !== commentId) return c;
      const alreadyLiked = c.likedBy?.includes('currentUser');
      return {
        ...c,
        likes: alreadyLiked ? c.likes - 1 : c.likes + 1,
        likedBy: alreadyLiked ? (c.likedBy || []).filter(u => u !== 'currentUser') : [...(c.likedBy || []), 'currentUser'],
      };
    });
    updateComments(updated);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-left">
          <span className="comments__title">Comments & Ratings</span>
          <span className="comments__count">{comments.length}</span>
        </div>
        <button className="comments__add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Comment'}
        </button>
      </div>

      {/* Star Rating */}
      <div className="comments__rating">
        <span className="comments__rating-label">Rate this:</span>
        <div className="comments__stars">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              className={`comments__star ${(hoverStar || userRating) >= star ? 'comments__star--active' : ''}`}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoverStar(star)}
              onMouseLeave={() => setHoverStar(0)}
            >
              ★
            </button>
          ))}
        </div>
        <span className="comments__rating-info">
          {userRating ? `You rated ${userRating}/5` : 'Tap to rate'}
          {avgRating > 0 && ` · Avg ${avgRating.toFixed(1)}/5 (${ratings.count} votes)`}
        </span>
      </div>

      {/* Comment Form */}
      {showForm && (
        <form className="comments__form" onSubmit={handleSubmit}>
          <input
            className="comments__input comments__input--name"
            placeholder="Your name (optional)"
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            maxLength={30}
          />
          <textarea
            className="comments__input comments__input--text"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            rows={3}
            maxLength={500}
            autoFocus
          />
          <div className="comments__form-footer">
            <span className="comments__char-count">{newComment.length}/500</span>
            <button type="submit" className="comments__submit" disabled={!newComment.trim()}>
              Post Comment
            </button>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="comments__list">
        {comments.length === 0 && !showForm && (
          <div className="comments__empty">
            <span className="comments__empty-icon">💬</span>
            <span>No comments yet. Be the first!</span>
          </div>
        )}
        {comments.map(comment => (
          <div key={comment.id} className="comments__item">
            <div className="comments__item-header">
              <div className="comments__author-avatar" style={{ background: `hsl(${comment.author.length * 30}, 50%, 50%)` }}>
                {comment.author[0].toUpperCase()}
              </div>
              <div>
                <span className="comments__author">{comment.author}</span>
                <span className="comments__date">{formatDate(comment.date)}</span>
              </div>
            </div>
            <p className="comments__text">{comment.text}</p>
            <div className="comments__item-actions">
              <button
                className={`comments__like-btn ${comment.likedBy?.includes('currentUser') ? 'comments__like-btn--active' : ''}`}
                onClick={() => handleLike(comment.id)}
              >
                {comment.likedBy?.includes('currentUser') ? '♥' : '♡'}
                <span>{comment.likes || 0}</span>
              </button>
            </div>
          </div>
        ))}
        {comments.length > 3 && (
          <div className="comments__list-footer">
            <span>Showing all {comments.length} comments</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
