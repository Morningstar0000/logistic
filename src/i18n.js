// /src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all language files
import english from './locales/english.json';
import french from './locales/french.json';
import spanish from './locales/spanish.json';
import chinese from './locales/china.json'; // Note: renamed to chinese for clarity
import german from './locales/germany.json';

// Language codes mapping
const languageMap = {
  'en': 'english',
  'fr': 'french', 
  'es': 'spanish',
  'zh': 'chinese',
  'de': 'german'
};

// Resources configuration
const resources = {
  en: { translation: english },
  fr: { translation: french },
  es: { translation: spanish },
  zh: { translation: chinese },
  de: { translation: german }
};

// RTL languages (Arabic, Hebrew, etc.)
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'es', 'zh', 'de'],
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
      
      // Map language codes to your file names
      convertDetectedLanguage: (lng) => {
        const detected = lng.split('-')[0]; // Get language code only (en-US → en)
        return languageMap[detected] ? detected : 'en';
      }
    }
  });

// Function to check if current language is RTL
export const isRTL = () => {
  const currentLang = i18n.language;
  return rtlLanguages.includes(currentLang);
};

// Function to change language
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng).then(() => {
    // Update HTML direction for RTL languages
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    // Save to localStorage
    localStorage.setItem('i18nextLng', lng);
  });
};

// Function to get current language name
export const getCurrentLanguageName = () => {
  const langCode = i18n.language;
  const names = {
    'en': 'English',
    'fr': 'Français',
    'es': 'Español',
    'zh': '中文',
    'de': 'Deutsch'
  };
  return names[langCode] || 'English';
};

export default i18n;