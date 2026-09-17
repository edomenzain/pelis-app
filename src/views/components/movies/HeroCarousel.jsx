import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../common/Icon';

export default function HeroCarousel({ movies }) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (newIndex) => {
      setDirection(newIndex > index ? 1 : -1);
      setIndex((newIndex + movies.length) % movies.length);
    },
    [index, movies.length],
  );

  useEffect(() => {
    if (movies.length < 2) return undefined;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (movies.length === 0) return null;
  const movie = movies[index];

  return (
    <section
      className="relative h-[70vh] min-h-[420px] max-h-[720px] w-full overflow-hidden"
      aria-label="Destacados"
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={movie.id}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={movie.backdropPath}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-bg/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1 rounded-full bg-accent-500/20 border border-accent-400/40 px-3 py-1 text-xs font-bold text-accent-300">
                <Icon name="star" size={14} filled />
                {movie.rating.toFixed(1)} / 10
              </span>
              <span className="text-xs text-slate-400">{movie.genres.join(' · ')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-3 text-gradient">
              {movie.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 line-clamp-3 mb-6">
              {movie.synopsis}
            </p>
            <Link to={`/movie/${movie.id}`}>
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="cursor-pointer inline-flex min-h-[44px] items-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 text-sm font-semibold text-white shadow-glow"
              >
                {t('hero.cta')}
              </motion.span>
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Anterior"
            className="cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Icon name="chevron_left" size={20} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            {movies.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a ${m.title}`}
                aria-current={i === index}
                className={`cursor-pointer h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-primary-400' : 'w-2 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente"
            className="cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Icon name="chevron_right" size={20} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
