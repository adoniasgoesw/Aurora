import { createContext, useContext, useState, useEffect } from 'react';

const LocaleContext = createContext();

const translations = {
  en: {
    badge: 'Chrome compatible',
    headline: 'Automate your Meta AI creative workflow.',
    subtitle: 'Send multiple prompts, generate images automatically, and download everything organized on your computer.',
    downloadExtension: 'Download Extension',
    viewDocs: 'View Documentation',
    docs: 'Docs',
    pricing: 'Pricing',
    download: 'Download',
    login: 'Login',
    signup: 'Signup',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    previewAlt: 'Aurora Pro - image and animation generation interface',
  },
  'pt-BR': {
    badge: 'Compatível com Chrome',
    headline: 'Automatize seu fluxo criativo no Meta AI.',
    subtitle: 'Envie múltiplos prompts, gere imagens automaticamente e baixe tudo organizado no seu computador.',
    downloadExtension: 'Download Extensão',
    viewDocs: 'Ver Documentação',
    docs: 'Documentação',
    pricing: 'Preços',
    download: 'Download',
    login: 'Login',
    signup: 'Signup',
    themeToLight: 'Mudar para tema claro',
    themeToDark: 'Mudar para tema escuro',
    previewAlt: 'Aurora Pro - interface de geração de imagens e animações',
  },
};

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('locale') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'pt-BR' : 'en'));
  };

  const t = translations[locale] || translations.en;

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
