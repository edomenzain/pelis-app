import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Icon from '../common/Icon';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { useAuthStore } from '../../../controllers/store/authStore';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-200 ${
    isActive ? 'text-primary-400' : 'text-slate-300 hover:text-white'
  }`;

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toggleLang() {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('pelismania:lang', next);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        <Link to="/" aria-label="PelisMania - Inicio">
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <NavLink to="/nuevo" className={navLinkClass}>
            {t('nav.new')}
          </NavLink>
          <NavLink to="/mejor-calificado" className={navLinkClass}>
            {t('nav.topRated')}
          </NavLink>
          <NavLink to="/categorias" className={navLinkClass}>
            {t('nav.categories')}
          </NavLink>
        </div>

        <div className="hidden md:block flex-1 max-w-xs">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="cursor-pointer hidden sm:inline-flex min-h-[44px] items-center px-3 rounded-full text-xs font-semibold border border-white/10 text-slate-300 hover:bg-white/10 transition-colors"
            aria-label="Cambiar idioma"
          >
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="hidden sm:inline text-sm font-medium text-accent-400 hover:text-accent-300"
                >
                  {t('nav.admin')}
                </Link>
              )}
              <Link to="/profile" aria-label={t('nav.profile')}>
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-400 cursor-pointer"
                />
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="cursor-pointer hidden lg:inline text-sm text-slate-400 hover:text-white transition-colors"
              >
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <Link to="/login">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer inline-flex min-h-[44px] items-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-4 text-sm font-semibold text-white shadow-glow"
              >
                {t('nav.login')}
              </motion.span>
            </Link>
          )}

          <button
            type="button"
            className="cursor-pointer lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <Icon name="close" size={24} className="text-white" />
            ) : (
              <Icon name="menu" size={24} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden glass px-4 pb-4 flex flex-col gap-4"
        >
          <SearchBar />
          <NavLink to="/nuevo" className={navLinkClass} onClick={() => setMobileOpen(false)}>
            {t('nav.new')}
          </NavLink>
          <NavLink
            to="/mejor-calificado"
            className={navLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            {t('nav.topRated')}
          </NavLink>
          <NavLink to="/categorias" className={navLinkClass} onClick={() => setMobileOpen(false)}>
            {t('nav.categories')}
          </NavLink>
          <button
            type="button"
            onClick={toggleLang}
            className="cursor-pointer text-sm text-slate-300 text-left"
          >
            {i18n.language === 'es' ? 'English' : 'Español'}
          </button>
        </motion.div>
      )}
    </header>
  );
}
