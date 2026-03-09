import { useState, useEffect } from 'react';
import { Menu, X, Github, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocale } from '../contexts/LocaleContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLocale();

  const navLinks = [
    { label: t.docs, href: '#' },
    { label: t.pricing, href: '#' },
    { label: t.download, href: '/aurora-pro.zip', download: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-6 sm:py-3 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 dark:bg-neutral-950/40 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/50 shadow-lg shadow-neutral-200/50 dark:shadow-black/20'
            : ''
        }`}
      >
        {/* Logo + Nav links */}
        <div className="flex items-center gap-6 md:gap-8">
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Aurora"
              className="h-8 w-8 sm:h-9 sm:w-9"
            />
          </a>
          {/* Desktop nav links - beside logo */}
          <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.download && { download: 'aurora-pro.zip' })}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-400 p-2 text-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-500 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          </div>
        </div>

        {/* Right section: Locale toggle + Theme toggle + Login + Signup + Mobile menu button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex items-center justify-center rounded-full px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
            aria-label={locale === 'en' ? 'Switch to Portuguese' : 'Switch to English'}
            title={locale === 'en' ? 'PT-BR' : 'EN'}
          >
            {locale === 'en' ? 'PT' : 'EN'}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-full p-2 text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
            aria-label={theme === 'dark' ? t.themeToLight : t.themeToDark}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <a
            href="#"
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-neutral-400 px-5 py-2.5 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {t.login}
          </a>
          <a
            href="#"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 25%, #8b5cf6 75%, #ec4899 100%)',
            }}
          >
            {t.signup}
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out mx-4 mt-2 ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800/50 bg-white/70 dark:bg-neutral-950/40 backdrop-blur-xl px-4 py-4 space-y-2 shadow-lg shadow-neutral-200/50 dark:shadow-black/20">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.download && { download: 'aurora-pro.zip' })}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-400 p-2 text-neutral-900 w-fit"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <div className="flex gap-2 pt-2">
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 text-center rounded-full border border-neutral-400 px-4 py-2.5 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {t.login}
            </a>
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 text-center rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 25%, #8b5cf6 75%, #ec4899 100%)' }}
            >
              {t.signup}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
