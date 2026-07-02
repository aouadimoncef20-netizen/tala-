import React, { memo, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useUIStore from '../stores/uiStore';
import useLibraryStore from '../stores/libraryStore';
import LangSwitcher from './LangSwitcher';
import './Header.css';

const PAGE_TITLES = {
  home: { titleKey: 'nav.home', subKey: null },
  explore: { titleKey: 'nav.explore', subKey: null },
  radio: { titleKey: 'nav.radio', subKey: null },
  podcasts: { titleKey: 'nav.podcasts', subKey: null },
  library: { titleKey: 'library.title', subKey: null },
  profile: { titleKey: 'profile.title', subKey: 'profile.subtitle' },
};

const Header = memo(() => {
  const { t } = useTranslation();
  const activeView = useUIStore(s => s.activeView);
  const searchQuery = useUIStore(s => s.searchQuery);
  const handleSearch = useUIStore(s => s.handleSearch);
  const setShowPremium = useUIStore(s => s.setShowPremium);
  const setActiveView = useUIStore(s => s.setActiveView);

  const theme = useLibraryStore(s => s.theme);
  const toggleTheme = useLibraryStore(s => s.toggleTheme);

  const info = PAGE_TITLES[activeView] || { titleKey: '', subKey: '' };
  const [localValue, setLocalValue] = useState(searchQuery);
  const debounceRef = useRef(null);

  // Sync external searchQuery changes back to local
  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <div>
          <div className="header__page-title">{info.titleKey ? t(info.titleKey) : ''}</div>
          <div className="header__page-sub">{info.subKey ? t(info.subKey) : ''}</div>
        </div>
      </div>

      <div className="header__center">
        <div className="header__search">
          <span className="header__search-icon">⌕</span>
          <input
            className="header__search-input"
            type="text"
            placeholder={activeView === 'explore' ? t('search.placeholder') : t('search.placeholderShort')}
            value={localValue}
            onChange={handleChange}
            aria-label="Search tracks and artists"
          />
        </div>
      </div>

      <div className="header__right">
        <LangSwitcher variant="dropdown" />
        <button className="header__theme-btn" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle theme">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <button className="header__premium-btn" onClick={() => setShowPremium(true)} aria-label="View premium plans">✦ {t('premium.title')}</button>
        <div className="header__avatar" onClick={() => setActiveView('profile')} title={t('profile.title')} aria-label="Open profile" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveView('profile'); } }}>U</div>
      </div>
    </header>
  );
});

export default Header;
