import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
];

const LangSwitcher = ({ variant = 'inline' }) => {
  const { i18n } = useTranslation();

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('tala_lang', code);
    document.documentElement.dir = i18n.dir(code);
    document.documentElement.lang = code;
  };

  if (variant === 'dropdown') {
    return (
      <select
        className="lang-switcher__select"
        value={i18n.language}
        onChange={(e) => handleChange(e.target.value)}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className="lang-switcher">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${i18n.language === lang.code ? 'lang-btn--active' : ''}`}
          onClick={() => handleChange(lang.code)}
          title={lang.label}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LangSwitcher;
