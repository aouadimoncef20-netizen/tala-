import React, { useState } from 'react';
import { AUDIOBOOKS } from '../data/athir-data';
import CommentSection from './CommentSection';
import './MainContent.css';

const AudiobookView = ({ onPlay, currentTrack, isPlaying }) => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(AUDIOBOOKS.map(b => b.category))];

  const filtered = filter === 'All' ? AUDIOBOOKS : AUDIOBOOKS.filter(b => b.category === filter);

  if (selected) {
    const book = selected;
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingTop: 4 }}>
          <button onClick={() => setSelected(null)} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', width: 28, height: 28, borderRadius: 4, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 10, color: 'var(--text-subdued)', textTransform: 'uppercase', letterSpacing: 1 }}>Audiobook</span>
        </div>

        <div className="hero-mini" style={{ borderBottom: 'none', paddingTop: 0 }}>
          <div className="hero-mini__img" style={{ width: 100, height: 100, borderRadius: 'var(--radius-md)', background: `linear-gradient(135deg, ${book.color}, ${book.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: '#fff' }}>
            {book.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <div className="hero-mini__info">
            <h1 className="hero-mini__title">{book.title}</h1>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>{book.author} · Narrated by {book.narrator}</p>
            <p style={{ fontSize: 11, color: 'var(--text-subdued)' }}>{book.category} · {book.duration} · {book.chapters} chapters</p>
            <p style={{ fontSize: 12, color: 'var(--text-subdued)', marginTop: 8, lineHeight: 1.5 }}>{book.desc}</p>
            <button
              className="hero__btn"
              style={{ marginTop: 12 }}
              onClick={() => onPlay({
                id: book.id,
                title: book.title,
                artist: book.author,
                podcastName: book.author,
                duration: book.duration,
                image: book.image,
                type: 'audiobook',
              })}
            >
              ▶ Start Listening
            </button>
          </div>
        </div>
        <CommentSection contentId={book.id} contentType="audiobook" title={book.title} />
      </div>
    );
  }

  return (
    <div>
      <div className="hero-mini">
        <div className="hero-mini__info">
          <div className="hero-mini__type">🎧 Audiobooks</div>
          <h1 className="hero-mini__title">Algerian Audiobooks</h1>
          <p className="hero-mini__desc">Literature, history, poetry, and philosophy — listen to Algerian voices across the ages.</p>
        </div>
      </div>

      {/* Category filters */}
      <div className="chip-row" style={{ marginBottom: 20 }}>
        {categories.map(cat => (
          <button key={cat} className={`chip ${filter === cat ? 'chip--active' : ''}`} onClick={() => setFilter(cat)} style={filter === cat ? { background: '#6A1B9A', borderColor: '#6A1B9A', color: '#fff' } : {}}>{cat}</button>
        ))}
      </div>

      <div className="scroll">
        {filtered.map(book => (
          <div key={book.id} className="card" onClick={() => setSelected(book)} style={{ minWidth: 170, maxWidth: 170 }}>
            <div className="card__img-wrap">
              <div className="card__img" style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff' }}>
                {book.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="card__play card__play--visible" style={{ background: '#6A1B9A' }}>
                <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
              </div>
            </div>
            <div className="card__body">
              <div className="card__title">{book.title}</div>
              <div className="card__sub">{book.author} · {book.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiobookView;
