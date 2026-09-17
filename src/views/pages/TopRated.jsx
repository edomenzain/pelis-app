import { useTranslation } from 'react-i18next';
import { useMovies } from '../../controllers/hooks/useMovies';
import MovieGrid from '../components/movies/MovieGrid';

export default function TopRated() {
  const { t } = useTranslation();
  const { movies, isLoading } = useMovies();

  if (isLoading) return <div className="skeleton h-96 w-full" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-display font-bold text-white mb-8">{t('nav.topRated')}</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
