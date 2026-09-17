import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';

export default function MovieCard({ movie, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4), ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/movie/${movie.id}`} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-cinema-surface">
          <motion.img
            src={movie.posterPath}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur px-2 py-1 text-xs font-bold text-accent-400">
            <Icon name="star" size={14} filled />
            {movie.rating.toFixed(1)}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-xs text-slate-300 line-clamp-2">{movie.genres.join(' · ')}</p>
          </div>
        </div>
        <h3 className="mt-2 text-sm font-semibold text-slate-100 truncate group-hover:text-primary-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-slate-500">{movie.year}</p>
      </Link>
    </motion.div>
  );
}
