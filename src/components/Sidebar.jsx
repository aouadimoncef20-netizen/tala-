import React, { memo } from 'react';
import { ARTISTS } from '../data/artists';
import { RADIO_STATIONS } from '../data/radio';
import { PODCASTS } from '../data/podcasts';
import { GENRES } from '../data/genres';
import useUIStore from '../stores/uiStore';
import './Sidebar.css';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'â—‡' },
  { key: 'explore', label: 'Explore', icon: 'â—Ž' },
  { key: 'radio', label: 'Radio Live', icon: 'â—ˆ' },
  { key: 'podcasts', label: 'Podcasts', icon: 'â–£' },
  { key: 'library', label: 'Library', icon: 'â–¤' },
  { key: 'playlists', label: 'Playlists', icon: 'â‰¡' },
  { key: 'audiobooks', label: 'Audiobooks', icon: '◆' },
  { key: 'stats', label: 'Stats', icon: '📊' },
  { key: 'upload', label: 'Submit Music', icon: '🎤' },
];

const Sidebar = memo(() => {
  const activeView = useUIStore(s => s.activeView);
  const setActiveView = useUIStore(s => s.setActiveView);
  return (
    <aside className="sidebar" aria-label="Main navigation">
      {/* Brand */}
      <div className="sidebar__brand">
        <div className="sidebar__logo">A</div>
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">Tala</span>
          <span className="sidebar__brand-tag">Peaceful Audio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            className={`sidebar__item ${activeView === item.key ? 'sidebar__item--active' : ''}`}
            onClick={() => setActiveView(item.key)}
            title={item.label}
            aria-label={item.label}
          >
            <span className="sidebar__item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Stats */}
      <div className="sidebar__label">Library</div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <span className="sidebar__stat-dot" style={{ background: '#D4875E' }} />
          <span>Artists</span>
          <span className="sidebar__stat-count">{ARTISTS.length}</span>
        </div>
        <div className="sidebar__stat" onClick={() => setActiveView('radio')}>
          <span className="sidebar__stat-dot" style={{ background: '#4A9BAA' }} />
          <span>Radio</span>
          <span className="sidebar__stat-count">{RADIO_STATIONS.length}</span>
        </div>
        <div className="sidebar__stat" onClick={() => setActiveView('podcasts')}>
          <span className="sidebar__stat-dot" style={{ background: '#C9A04A' }} />
          <span>Podcasts</span>
          <span className="sidebar__stat-count">{PODCASTS.length}</span>
        </div>
        <div className="sidebar__stat">
          <span className="sidebar__stat-dot" style={{ background: '#5AA87A' }} />
          <span>Genres</span>
          <span className="sidebar__stat-count">{GENRES.length}</span>
        </div>
      </div>

      {/* Recent */}
      <div className="sidebar__label">Recent</div>
      <div className="sidebar__recent">
        {ARTISTS.slice(0, 5).map((a, i) => (
          <div key={a.id} className="sidebar__recent-item">
            <img className="sidebar__recent-img" src={a.image} alt={a.name} loading="lazy" />
            <div className="sidebar__recent-info">
              <div className="sidebar__recent-title">{a.name}</div>
              <div className="sidebar__recent-artist">{a.genre} Â· {a.followers}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar__footer">
        <span>Tala Â© 2026</span>
        <span>Privacy</span>
      </div>
    </aside>
  );
});

export default Sidebar;

