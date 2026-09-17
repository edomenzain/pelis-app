import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Icon from '../common/Icon';

export default function PendingMovies({ pending, onApprove, onReject }) {
  const { t } = useTranslation();

  if (pending.length === 0) {
    return <p className="text-slate-500 text-sm py-6">{t('admin.noPendingMovies')}</p>;
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {pending.map((movie) => (
          <motion.div
            key={movie.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
            className="glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <img
              src={movie.posterPath}
              alt=""
              className="w-12 h-16 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-100 truncate">
                {movie.title} <span className="text-slate-400">({movie.year})</span>
              </p>
              <p className="text-sm text-slate-300 mt-1 line-clamp-2">{movie.synopsis}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => onApprove(movie.id)}
                aria-label={t('admin.approve')}
                className="cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30"
              >
                <Icon name="check" size={20} />
              </button>
              <button
                type="button"
                onClick={() => onReject(movie.id)}
                aria-label={t('admin.reject')}
                className="cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
