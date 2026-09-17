import { useTranslation } from 'react-i18next';
import { movieService } from '../../models/services/movieService';
import MovieGrid from '../components/movies/MovieGrid';

export default function NewReleases() {
  const { t } = useTranslation();
  const movies = movieService.getLatest(20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-display font-bold text-white mb-8">{t('nav.new')}</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
