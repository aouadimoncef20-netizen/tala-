import React, { useState } from 'react';
import { GENRES } from '../data/genres';
import './UploadForm.css';

const UPLOAD_KEY = 'tala_upload_queue';

const UploadForm = ({ onClose, onToast }) => {
  const [form, setForm] = useState({
    artistName: '',
    songTitle: '',
    genre: '',
    link: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.artistName.trim()) errs.artistName = 'Artist name is required';
    if (!form.songTitle.trim()) errs.songTitle = 'Song title is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submission = {
      id: `upload_${Date.now()}`,
      ...form,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(UPLOAD_KEY) || '[]');
      existing.push(submission);
      localStorage.setItem(UPLOAD_KEY, JSON.stringify(existing));
    } catch {}

    setSubmitted(true);
    if (onToast) onToast('Submission received! Our team will review it.');
  };

  if (submitted) {
    return (
      <div className="upload-overlay" onClick={onClose}>
        <div className="upload-card upload-card--success" onClick={e => e.stopPropagation()}>
          <div className="upload-success">
            <div className="upload-success__icon">🎉</div>
            <h2 className="upload-success__title">Thank You!</h2>
            <p className="upload-success__text">Our team will review your submission.</p>
            <button className="upload-success__btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-overlay" onClick={onClose}>
      <div className="upload-card" onClick={e => e.stopPropagation()}>
        <button className="upload-card__close" onClick={onClose}>✕</button>

        <div className="upload-card__header">
          <span className="upload-card__header-icon">🎤</span>
          <h2 className="upload-card__title">Submit Your Music</h2>
          <p className="upload-card__sub">Share your track with the Tala community</p>
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="upload-field">
            <label className="upload-field__label">Artist Name *</label>
            <input
              className={`upload-field__input ${errors.artistName ? 'upload-field__input--error' : ''}`}
              placeholder="Your stage name"
              value={form.artistName}
              onChange={e => handleChange('artistName', e.target.value)}
            />
            {errors.artistName && <span className="upload-field__error">{errors.artistName}</span>}
          </div>

          <div className="upload-field">
            <label className="upload-field__label">Song Title *</label>
            <input
              className={`upload-field__input ${errors.songTitle ? 'upload-field__input--error' : ''}`}
              placeholder="Name of your track"
              value={form.songTitle}
              onChange={e => handleChange('songTitle', e.target.value)}
            />
            {errors.songTitle && <span className="upload-field__error">{errors.songTitle}</span>}
          </div>

          <div className="upload-field">
            <label className="upload-field__label">Genre</label>
            <select
              className="upload-field__input"
              value={form.genre}
              onChange={e => handleChange('genre', e.target.value)}
            >
              <option value="">Select a genre</option>
              {GENRES.map(g => (
                <option key={g.name} value={g.name}>{g.name}</option>
              ))}
            </select>
          </div>

          <div className="upload-field">
            <label className="upload-field__label">YouTube / SoundCloud Link</label>
            <input
              className="upload-field__input"
              placeholder="https://youtube.com/..."
              value={form.link}
              onChange={e => handleChange('link', e.target.value)}
            />
          </div>

          <div className="upload-field">
            <label className="upload-field__label">Description</label>
            <textarea
              className="upload-field__input upload-field__textarea"
              placeholder="Tell us about your track..."
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <button type="submit" className="upload-submit">
            Submit for Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
