import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from 'src/shared/lib/locales/en.json';
import ru from 'src/shared/lib/locales/ru.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
