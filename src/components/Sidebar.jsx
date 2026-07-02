import React, { memo } from 'react';
import { ARTISTS } from '../data/artists';
import { RADIO_STATIONS } from '../data/radio';
import { PODCASTS } from '../data/podcasts';
import { GENRES } from '../data/genres';
import useUIStore from '../stores/uiStore';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'fa-solid fa-house' },
  { key: 'explore', label: 'Explore', icon: 'fa-solid fa-compass' },
  { key: 'radio', label: 'Radio Live', icon: 'fa-solid fa-tower-broadcast' },
  { key: 'podcasts', label: 'Podcasts', icon: 'fa-solid fa-podcast' },
  { key: 'library', label: 'Library', icon: 'fa-solid fa-book' },
  { key: 'playlists', label: 'Playlists', icon: 'fa-solid fa-list' },
  { key: 'audiobooks', label: 'Audiobooks', icon: 'fa-solid fa-headphones' },
  { key: 'stats', label: 'Stats', icon: 'fa-solid fa-chart-simple' },
  { key: 'upload', label: 'Submit Music', icon: 'fa-solid fa-microphone' },
];

const GENRE_COLORS = { Rai: '#D32F2F', Chaabi: '#2E7D32', Kabyle: '#F5A623', 'Rap Dz': '#00ACC1' };

const Sidebar = memo(() => {
  const activeView = useUIStore(s => s.activeView);
  const setActiveView = useUIStore(s => s.setActiveView);
  return (
    <aside className="sidebar w-[var(--sidebar-width)] min-w-[var(--sidebar-width)] glass flex flex-col overflow-hidden border-l border-[var(--border)]" aria-label="Main navigation">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 pt-[18px] pb-[14px] border-b border-[var(--border)]">
        <div className="w-[34px] h-[34px] rounded-lg bg-[#D4875E] flex items-center justify-center text-[#0C0F14] font-extrabold text-lg flex-shrink-0" style={{boxShadow:'0 0 20px rgba(212,135,94,0.25)'}}>T</div>
        <div className="flex flex-col">
          <span className="text-[17px] font-bold text-gradient-copper leading-tight">Tala</span>
          <span className="text-[9px] text-[#D4875E] font-semibold tracking-[1.5px] uppercase">Peaceful Audio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-[2px] px-2.5 py-3">
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            className={`sidebar-link flex items-center gap-2.5 px-3 py-[9px] rounded-[var(--radius-sm)] text-sm font-medium transition-all duration-200 w-full text-left ${
              activeView === item.key
                ? 'bg-gradient-to-r from-[rgba(212,135,94,0.12)] to-transparent text-[#D4875E] font-semibold border-r-[3px] border-[#D4875E]'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] hover:translate-x-[2px]'
            }`}
            onClick={() => setActiveView(item.key)}
            title={item.label}
            aria-label={item.label}
          >
            <i className={`${item.icon} w-5 text-center text-sm ${activeView === item.key ? 'text-[#D4875E]' : ''}`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Stats */}
      <div className="px-4 pt-4 pb-1.5 text-[10px] font-semibold text-[var(--text-subdued)] uppercase tracking-[1px]">Library</div>
      <div className="flex flex-col gap-[2px] px-2.5 pb-2">
        {[
          { label: 'Artists', count: ARTISTS.length, color: '#D4875E', onClick: null },
          { label: 'Radio', count: RADIO_STATIONS.length, color: '#4A9BAA', onClick: () => setActiveView('radio') },
          { label: 'Podcasts', count: PODCASTS.length, color: '#C9A04A', onClick: () => setActiveView('podcasts') },
          { label: 'Genres', count: GENRES.length, color: '#5AA87A', onClick: null },
        ].map(stat => (
          <div key={stat.label} className={`flex items-center gap-2 px-2.5 py-[7px] rounded-[var(--radius-sm)] cursor-pointer transition-all text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] ${stat.onClick ? '' : ''}`} onClick={stat.onClick}>
            <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: stat.color }} />
            <span>{stat.label}</span>
            <span className="ml-auto text-[10px] text-[var(--text-subdued)] font-semibold">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Genre Quick Stats */}
      <div className="px-4 pt-3 pb-1.5 text-[10px] font-semibold text-[var(--text-subdued)] uppercase tracking-[1px]">Genres</div>
      <div className="flex flex-col gap-[2px] px-2.5">
        {['Rai', 'Chaabi', 'Kabyle', 'Rap Dz'].map(genre => (
          <div key={genre} className="flex items-center gap-2 px-2.5 py-[7px] rounded-[var(--radius-sm)] cursor-pointer transition-all text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]">
            <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: GENRE_COLORS[genre] }} />
            <span>{genre}</span>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="flex-1 overflow-y-auto px-2.5 pt-3 pb-2 min-h-0">
        <div className="px-3 pb-1.5 text-[10px] font-semibold text-[var(--text-subdued)] uppercase tracking-[1px]">Recent</div>
        {ARTISTS.slice(0, 5).map(a => (
          <div key={a.id} className="flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius-sm)] cursor-pointer transition-all hover:bg-[var(--bg-card)]">
            <img className="w-[30px] h-[30px] rounded object-cover flex-shrink-0" src={a.image} alt={a.name} loading="lazy" />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-[var(--text-primary)] truncate">{a.name}</div>
              <div className="text-[9px] text-[var(--text-subdued)] truncate">{a.genre} · {a.followers}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-[var(--border)] text-[9px] text-[var(--text-subdued)] flex justify-between">
        <span className="cursor-pointer hover:text-[var(--text-secondary)] transition-colors">Tala © 2026</span>
        <span className="cursor-pointer hover:text-[var(--text-secondary)] transition-colors">Privacy</span>
      </div>
    </aside>
  );
});

export default Sidebar;
