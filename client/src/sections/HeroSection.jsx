import { Download, FileText } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';

export default function HeroSection() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-4 pb-10 sm:pt-2 sm:pb-16 lg:py-20 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl w-full text-center">
        {/* Badge - Compatível com Chrome */}
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800/50 px-4 py-2 sm:py-1.5 text-sm sm:text-base mb-6 sm:mb-8 transition-colors hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-default">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span
            className="font-medium bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 25%, #8b5cf6 75%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
            }}
          >
            {t.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-5xl lg:text-6xl leading-tight font-semibold tracking-tight text-center text-neutral-800 dark:text-neutral-100 px-2 sm:px-0">
          {t.headline}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-500 max-w-xl mx-auto px-2 sm:px-0">
          {t.subtitle}
        </p>

        {/* Botões */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0">
          <a
            href="/aurora-pro.zip"
            download="aurora-pro.zip"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 25%, #8b5cf6 75%, #ec4899 100%)',
            }}
          >
            <Download className="h-5 w-5" />
            {t.downloadExtension}
          </a>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-400 px-6 py-3.5 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <FileText className="h-5 w-5" />
            {t.viewDocs}
          </a>
        </div>

        {/* Preview da extensão com borda neon - apenas topo até o meio */}
        <div className="mt-8 sm:mt-12 lg:mt-16 relative w-full px-0 sm:px-2 pb-[50px]">
          {/* Glow neon - topo até meio, largura reduzida */}
          <div
            className="absolute left-0 right-0 top-0 -translate-y-2 h-1/2 -z-10 blur-lg"
            style={{
              background: 'linear-gradient(180deg, rgba(34,211,238,0.8) 0%, rgba(139,92,246,0.6) 50%, transparent 100%)',
            }}
          />
          <div
            className="absolute left-0 right-0 top-0 -translate-y-1 h-1/2 -z-10 blur-md"
            style={{
              background: 'linear-gradient(180deg, #22d3ee, #8b5cf6)',
              opacity: 0.8,
            }}
          />
          <div className="relative mx-auto w-full max-w-4xl lg:max-w-5xl rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/80 p-2 sm:p-4 shadow-xl shadow-neutral-200/50 dark:shadow-black/50">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <img
                src="/preview-aurora.png"
                alt={t.previewAlt}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
