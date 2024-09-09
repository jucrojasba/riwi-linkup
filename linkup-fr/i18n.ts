import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa tus recursos de traducción
import enTranslations from './public/locales/en/en.json';
import esTranslations from './public/locales/es/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },
    lng: 'en', // idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // no es necesario para React
    },
  });

export default i18n;
