import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationES from './locales/es.json';

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES }
};

i18n
  .use(LanguageDetector) // Automatically detects user browser language
  .use(initReactI18next)   // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',     // Default language if detector fails or translation misses
    interpolation: {
      escapeValue: false   // React already protects against XSS injection
    }
  });

export default i18n;