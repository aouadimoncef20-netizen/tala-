import React, { useState } from 'react';
import { PODCASTS, getEpisodesForPodcast } from '../data/podcasts';
import ShareButton from './ShareButton';
import CommentSection from './CommentSection';
import usePlayerStore from '../stores/playerStore';
import useLibraryStore from '../stores/libraryStore';
import useUIStore from '../stores/uiStore';
import { createToast } from './Toast';
import './MainContent.css';

const PodcastView = () => {
  const { currentTrack, isPlaying, playOrToggle } = usePlayerStore();
  const { likedTracks, toggleLike } = useLibraryStore();
  const { addToast } = useUIStore();
  const [selected, setSelected] = useState(null);

  const formatDate = (d) => {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m)-1]} ${parseInt(day)}, ${y}`;
  };

  if (selected) {
    const pod = PODCASTS.find(p => p.id === selected);
    const eps = getEpisodesForPodcast(selected);
    if (!pod) return null;

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingTop: 4 }}>
          <button onClick={() => setSelected(null)} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', width: 28, height: 28, borderRadius: 4, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 10, color: 'var(--text-subdued)', textTransform: 'uppercase', letterSpacing: 1 }}>Podcast</span>
          <ShareButton track={pod.title} artist={pod.host} type="podcast" onToast={(type, title, msg) => addToast(createToast(type, title, msg))} />
        </div>

        <div className="hero-mini" style={{ borderBottom: '1px solid var(--border)', paddingTop: 0, paddingBottom: 16 }}>
          <img className="hero-mini__img" src={pod.image} alt={pod.title} style={{ width: 100, height: 100 }} />
          <div className="hero-mini__info">
            <h1 className="hero-mini__title">{pod.title}</h1>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>{pod.host} · {pod.language} · {eps.length} episodes</p>
            <p style={{ fontSize: 11, color: 'var(--text-subdued)', marginBottom: 8, lineHeight: 1.4 }}>{pod.desc}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'var(--bg-card)', color: 'var(--text-subdued)' }}>{pod.category}</span>
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'var(--bg-card)', color: 'var(--text-subdued)' }}>{pod.language}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="section__head">
            <span className="section__title">Episodes</span>
            <span className="section__count">{eps.length}</span>
          </div>
          <div className="track-list">
            {eps.map((ep, i) => (
              <div key={ep.id} className={`track-row ${currentTrack?.id === ep.id && isPlaying ? 'track-row--active' : ''}`}
                onClick={() => playOrToggle({ ...ep, artist: ep.host, podcastName: pod.title, podcastId: pod.id })}
              >
                <span className="track-row__num">{i + 1}</span>
                <img className="track-row__img" src={ep.image} alt={ep.title} loading="lazy" />
                <div className="track-row__info">
                  <div className="track-row__title">
                    {currentTrack?.id === ep.id && isPlaying && <span className="track-row__indicator" />}
                    {ep.title}
                  </div>
                  <div className="track-row__artist">{formatDate(ep.date)} · {ep.duration}</div>
                  <div className="track-row__artist" style={{ fontSize: 9, color: 'var(--text-subdued)', marginTop: 2 }}>{ep.desc}</div>
                </div>
                <div className="track-row__actions">
                  <button className="track-row__action" onClick={(e) => { e.stopPropagation(); const wasLiked = toggleLike(ep.id); addToast(createToast(wasLiked ? 'removed' : 'liked', wasLiked ? 'Removed from likes' : 'Added to likes', '')); }}>
                    {likedTracks?.includes(ep.id) ? '♥' : '♡'}
                  </button>
                  <button className="track-row__action" onClick={(e) => { e.stopPropagation(); playOrToggle({ ...ep, artist: ep.host, podcastName: pod.title, podcastId: pod.id }); }}>
                    {currentTrack?.id === ep.id && isPlaying ? '⏸' : '▶'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CommentSection contentId={pod.id} contentType="podcast" title={pod.title} />
      </div>
    );
  }

  return (
    <div>
      <div className="hero-mini">
        <div className="hero-mini__info">
          <div className="hero-mini__type">▣ Podcasts</div>
          <h1 className="hero-mini__title">Algerian Podcasts</h1>
          <p className="hero-mini__desc">Culture, history, tech, sports, and stories from the Algerian perspective.</p>
        </div>
      </div>

      <div className="scroll">
        {PODCASTS.map(pod => (
          <div key={pod.id} className="card" onClick={() => setSelected(pod.id)}>
            <div className="card__img-wrap">
              <img className="card__img" src={pod.image} alt={pod.title} loading="lazy" />
            </div>
            <div className="card__body">
              <div className="card__title">{pod.title}</div>
              <div className="card__sub">{pod.host} · {pod.episodes} ep.</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastView;
