import React from 'react';
import { useTranslation } from 'react-i18next';

// Bring in your isolated visual rule file
import './LanguageSelector.css';

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();

  // Extract and normalize the raw base code (e.g., maps 'zh-CN' to 'zh')
  const currentLanguage = i18n.language || 'en';
  const displayLangBase = currentLanguage.split('-')[0];

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="language-selector-wrapper">
      <label htmlFor="global-lang-select" className="language-label">
        <span aria-hidden="true">🌐</span> {t('nav.language_label', 'Language:')}
      </label>
      <select
        id="global-lang-select"
        className="lang-select"
        value={displayLangBase}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="pt">Português</option>
        <option value="zh">中文 (简体)</option>
      </select>
    </div>
  );
}