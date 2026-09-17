import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useMovieSearch } from '../../../controllers/hooks/useMovieSearch';
import Icon from '../common/Icon';

export default function SearchBar() {
  const { t } = useTranslation();
  const { query, setQuery, results, isOpen } = useMovieSearch();
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  function goTo(id) {
    setQuery('');
    setFocused(false);
    navigate(`/movie/${id}`);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <div className="relative">
        <Icon
          name="search"
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={t('search.placeholder')}
          aria-label={t('search.placeholder')}
          className="w-full min-h-[44px] rounded-full bg-white/5 border border-white/10 pl-9 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-primary-400 outline-none transition-colors"
        />
      </div>
      <AnimatePresence>
        {isOpen && focused && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-2 w-full glass rounded-xl overflow-hidden shadow-xl z-50"
          >
            {results.length === 0 ? (
              <li className="px-4 py-3 text-sm text-slate-400">Sin resultados</li>
            ) : (
              results.map((movie) => (
                <li key={movie.id}>
                  <button
                    type="button"
                    onMouseDown={() => goTo(movie.id)}
                    className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 transition-colors text-left"
                  >
                    <img
                      src={movie.posterPath}
                      alt=""
                      className="w-8 h-11 object-cover rounded"
                      loading="lazy"
                    />
                    <span className="flex-1 text-sm text-slate-100 truncate">{movie.title}</span>
                    <span className="flex items-center gap-1 text-xs text-accent-400 font-semibold">
                      <Icon name="star" size={14} filled />
                      {movie.rating.toFixed(1)}
                    </span>
                  </button>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
