import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';
import fr from './fr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    fr: { translation: fr },
  },
  lng: localStorage.getItem('tala_lang') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Apply initial direction based on stored language
const lang = localStorage.getItem('tala_lang') || 'en';
document.documentElement.dir = i18n.dir(lang);
document.documentElement.lang = lang;

export default i18n;
