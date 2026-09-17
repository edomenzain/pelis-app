import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-slate-400 text-center">{t('footer.tagline')}</p>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} PelisMania. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
