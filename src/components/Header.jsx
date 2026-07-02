import React, { memo, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../stores/authStore';
import useUIStore from '../stores/uiStore';
import useLibraryStore from '../stores/libraryStore';
import LangSwitcher from './LangSwitcher';

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
  const user = useAuthStore(s => s.user);
  const profile = useAuthStore(s => s.profile);
  const signOut = useAuthStore(s => s.signOut);

  const info = PAGE_TITLES[activeView] || { titleKey: '', subKey: '' };
  const [localValue, setLocalValue] = useState(searchQuery);
  const debounceRef = useRef(null);

  useEffect(() => { setLocalValue(searchQuery); }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { handleSearch(value); }, 300);
  };

  useEffect(() => { return () => { if (debounceRef.current) clearTimeout(debounceRef.current); }; }, []);

  return (
    <header className="h-[var(--header-height)] glass flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          <button className="w-7 h-7 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center hover:bg-[var(--bg-card-hover)] transition-colors border border-[var(--border-light)]">
            <i className="fa-solid fa-chevron-left text-[var(--text-subdued)] text-[10px]"></i>
          </button>
          <button className="w-7 h-7 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center hover:bg-[var(--bg-card-hover)] transition-colors border border-[var(--border-light)]">
            <i className="fa-solid fa-chevron-right text-[var(--text-subdued)] text-[10px]"></i>
          </button>
        </div>
        <div>
          <div className="text-sm font-semibold text-[var(--text-primary)]">{info.titleKey ? t(info.titleKey) : ''}</div>
          <div className="text-[11px] text-[var(--text-subdued)]">{info.subKey ? t(info.subKey) : ''}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subdued)] text-xs"></i>
          <input
            className="bg-[var(--bg-elevated)] text-sm text-[var(--text-secondary)] placeholder-[var(--text-subdued)] pl-9 pr-4 py-1.5 rounded-md w-72 focus:outline-none focus:ring-1 focus:ring-[#D4875E]/40 focus:bg-[var(--bg-card-hover)] transition-all border border-[var(--border-light)] focus:border-[#D4875E]/30"
            type="text"
            placeholder={activeView === 'explore' ? t('search.placeholder') : t('search.placeholderShort')}
            value={localValue}
            onChange={handleChange}
            aria-label="Search tracks and artists"
          />
        </div>

        <LangSwitcher variant="dropdown" />

        <button className="p-1.5 rounded-md text-sm text-[var(--text-subdued)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-secondary)] transition-all" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle theme">
          {theme === 'dark' ? <i className="fa-regular fa-sun"></i> : <i className="fa-regular fa-moon"></i>}
        </button>

        <button className="text-[10px] uppercase tracking-wider font-semibold text-[#D4875E] bg-[#D4875E]/10 px-4 py-1.5 rounded-md hover:bg-[#D4875E]/20 transition-all border border-[#D4875E]/20 whitespace-nowrap" onClick={() => setShowPremium(true)} aria-label="View premium plans">
          <i className="fa-regular fa-gem mr-1"></i>{t('premium.title')}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#D4875E] flex items-center justify-center text-[#0C0F14] text-xs font-bold cursor-pointer hover:bg-[#E09B75] transition-colors relative group"
            onClick={() => setActiveView('profile')} title={t('profile.title')} aria-label="Open profile" role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveView('profile'); } }}>
            {profile?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
              <div className="px-3.5 py-2.5 border-b border-[var(--border)]">
                <div className="text-sm font-medium text-[var(--text-primary)] truncate">{profile?.username || user?.email?.split('@')[0] || 'User'}</div>
                <div className="text-[10px] text-[var(--text-subdued)] truncate">{user?.email}</div>
              </div>
              <button onClick={() => setActiveView('profile')} className="w-full text-left px-3.5 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] transition-colors flex items-center gap-2">
                <i className="fa-regular fa-user"></i> Profile
              </button>
              <button onClick={signOut} className="w-full text-left px-3.5 py-2 text-xs text-red-400 hover:bg-[var(--bg-card)] transition-colors flex items-center gap-2 border-t border-[var(--border)]">
                <i className="fa-solid fa-right-from-bracket"></i> {t('auth.signOut')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
