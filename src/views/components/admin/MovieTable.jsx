import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';

export default function MovieTable({ movies, onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto glass rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-slate-400">
            <th className="p-3 font-medium">Película</th>
            <th className="p-3 font-medium hidden sm:table-cell">Año</th>
            <th className="p-3 font-medium">Rating</th>
            <th className="p-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <motion.tr
              key={movie.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="p-3 flex items-center gap-3">
                <img
                  src={movie.posterPath}
                  alt=""
                  className="w-8 h-11 object-cover rounded flex-shrink-0"
                />
                <span className="text-slate-100 font-medium">{movie.title}</span>
              </td>
              <td className="p-3 text-slate-400 hidden sm:table-cell">{movie.year}</td>
              <td className="p-3 text-accent-400 font-semibold flex items-center gap-1">
                <Icon name="star" size={16} filled />
                {movie.rating.toFixed(1)}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(movie)}
                    aria-label={`${t('admin.edit')} ${movie.title}`}
                    className="cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 text-primary-400"
                  >
                    <Icon name="edit" size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(movie)}
                    aria-label={`${t('admin.delete')} ${movie.title}`}
                    className="cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 text-red-400"
                  >
                    <Icon name="delete" size={20} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
