import React, { useState, useEffect } from 'react';
import { getReviews, addReview, getAverageRating } from '../data/review-store';
import './ReviewSection.css';

const StarRating = ({ rating, onRate, interactive = true }) => {
  return (
    <div className="stars" style={{ cursor: interactive ? 'pointer' : 'default' }} role={interactive ? 'radiogroup' : 'img'} aria-label={interactive ? 'Rating' : `Rated ${rating} out of 5`}>
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          className={`star ${i <= rating ? 'star--filled' : ''} ${interactive ? 'star--interactive' : ''}`}
          onClick={() => interactive && onRate?.(i)}
          onKeyDown={(e) => { if (interactive && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onRate?.(i); } }}
          onMouseEnter={(e) => { if (interactive) { const stars = e.currentTarget.parentElement.children; for (let j = 0; j < stars.length; j++) stars[j].classList.toggle('star--hover', j < i); }}}
          onMouseLeave={(e) => { if (interactive) { const stars = e.currentTarget.parentElement.children; for (let j = 0; j < stars.length; j++) stars[j].classList.remove('star--hover'); }}}
          role={interactive ? 'radio' : 'presentation'}
          aria-label={interactive ? `${i} star${i !== 1 ? 's' : ''}` : ''}
          aria-checked={interactive ? i <= rating : undefined}
          tabIndex={interactive ? (i === 1 ? 0 : -1) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewSection = ({ albumId, onToast }) => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setReviews(getReviews(albumId));
    setAvgRating(getAverageRating(albumId));
  }, [albumId]);

  const handleSubmit = () => {
    if (newRating === 0) return;
    setSubmitting(true);
    addReview(albumId, { user: 'Guest', rating: newRating, text: newText });
    setReviews(getReviews(albumId));
    setAvgRating(getAverageRating(albumId));
    setNewRating(0);
    setNewText('');
    setSubmitting(false);
    onToast?.('info', 'Review submitted!', '');
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="reviews" aria-label="Ratings and Reviews">
      <div className="reviews__header">
        <h3 className="reviews__title">Ratings & Reviews</h3>
        {reviews.length > 0 && (
          <div className="reviews__avg">
            <StarRating rating={Math.round(avgRating)} interactive={false} />
            <span className="reviews__avg-num">{avgRating.toFixed(1)}</span>
            <span className="reviews__count">({reviews.length})</span>
          </div>
        )}
      </div>

      {/* Add review */}
      <div className="reviews__add">
        <h4 className="reviews__add-title">Rate this album</h4>
        <StarRating rating={newRating} onRate={setNewRating} />
        <textarea
          className="reviews__textarea"
          placeholder="Share your thoughts (optional)..."
          value={newText}
          onChange={e => setNewText(e.target.value.slice(0, 280))}
          rows={3}
          aria-label="Review text"
        />
        <div className="reviews__add-footer">
          <span className="reviews__char-count" aria-live="polite">{newText.length}/280</span>
          <button
            className="reviews__submit"
            onClick={handleSubmit}
            disabled={newRating === 0 || submitting}
            aria-label={submitting ? 'Submitting review' : newRating === 0 ? 'Select a rating to submit' : 'Submit review'}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>

      {/* Review list */}
      <div className="reviews__list">
        {reviews.length === 0 ? (
          <div className="reviews__empty" role="status">No reviews yet. Be the first!</div>
        ) : (
          [...reviews].reverse().map(review => (
            <article key={review.id} className="review-item" aria-label={`Review by ${review.user}, ${review.rating} stars`}>
              <div className="review-item__header">
                <div className="review-item__avatar" aria-hidden="true">{review.user[0]}</div>
                <div className="review-item__info">
                  <span className="review-item__user">{review.user}</span>
                  <span className="review-item__date">{formatDate(review.date)}</span>
                </div>
                <StarRating rating={review.rating} interactive={false} />
              </div>
              {review.text && <p className="review-item__text">{review.text}</p>}
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
