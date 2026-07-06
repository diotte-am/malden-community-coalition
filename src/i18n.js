import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // 1. Loads translation JSON files from your public/locales folder asynchronously
  .use(HttpBackend) 
  
  // 2. Detects user browser language settings automatically
  .use(LanguageDetector)
  
  // 3. Passes the i18n instance down to react-i18next
  .use(initReactI18next)
  
  // 4. Initialize configurations
  .init({
    // Fallback to English if a requested language string or resource namespace is missing
    fallbackLng: 'en',
    load: "languageOnly",
    
    // Explicitly declare the separate JSON asset namespaces we've built so far
    ns: ['common', 'news', 'videos', 'resources', 'staff'],
    
    // The fallback namespace used if no explicit filename prefix is provided in t()
    defaultNS: 'common',
    
    backend: {
      // The exact static URL path framework where your public JSON files are loaded from
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    interpolation: {
      // React already protects against XSS (cross-site scripting) attacks natively
      escapeValue: false, 
    },
    
    detection: {
      // Look for cached language settings in local storage/cookies before checking browser settings
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;