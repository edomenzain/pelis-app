import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { movieService } from '../../models/services/movieService';
import { useMovies } from '../../controllers/hooks/useMovies';
import GenrePill from '../components/common/GenrePill';
import MovieGrid from '../components/movies/MovieGrid';

export default function Categories() {
  const { t } = useTranslation();
  const { movies, isLoading } = useMovies();
  const genres = movieService.getAllGenres();
  const [selected, setSelected] = useState(genres[0] ?? null);

  if (isLoading) return <div className="skeleton h-96 w-full" />;

  const filtered = selected ? movies.filter((m) => m.genres.includes(selected)) : movies;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-display font-bold text-white mb-2">{t('nav.categories')}</h1>
      <p className="text-slate-400 mb-6">Explora por género cinematográfico.</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map((genre) => (
          <GenrePill
            key={genre}
            label={genre}
            selected={selected === genre}
            onClick={() => setSelected(genre)}
          />
        ))}
      </div>

      <motion.div key={selected} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <MovieGrid movies={filtered} />
      </motion.div>
    </div>
  );
}
