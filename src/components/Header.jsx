import React from 'react';
import './Header.css';

const PAGE_TITLES = {
  home: { title: 'Home', sub: 'Discover Algerian Audio' },
  explore: { title: 'Explore', sub: 'Browse by genre & artist' },
  radio: { title: 'Radio', sub: 'Live Algerian stations' },
  podcasts: { title: 'Podcasts', sub: 'Algerian voices & stories' },
  library: { title: 'Library', sub: 'Your collection' },
  profile: { title: 'Profile', sub: 'Your listening world' },
};

const Header = ({ searchQuery, setSearchQuery, activeView, onOpenProfile, onOpenPremium, theme, onToggleTheme }) => {
  const info = PAGE_TITLES[activeView] || { title: '', sub: '' };

  return (
    <header className="header">
      <div className="header__left">
        <div>
          <div className="header__page-title">{info.title}</div>
          <div className="header__page-sub">{info.sub}</div>
        </div>
      </div>

      <div className="header__center">
        <div className="header__search">
          <span className="header__search-icon">⌕</span>
          <input
            className="header__search-input"
            type="text"
            placeholder={activeView === 'explore' ? 'Search artists, tracks...' : 'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="header__right">
        <button className="header__theme-btn" onClick={onToggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <button className="header__premium-btn" onClick={onOpenPremium}>✦ Premium</button>
        <div className="header__avatar" onClick={onOpenProfile}>U</div>
      </div>
    </header>
  );
};

export default Header;
