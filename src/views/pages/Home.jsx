import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMovies } from '../../controllers/hooks/useMovies';
import { reviewService } from '../../models/services/reviewService';
import HeroCarousel from '../components/movies/HeroCarousel';
import MovieGrid from '../components/movies/MovieGrid';
import ReviewList from '../components/reviews/ReviewList';
import Button from '../components/common/Button';

export default function Home() {
  const { t } = useTranslation();
  const { movies, isLoading } = useMovies();
  const latestReviews = reviewService
    .getAll()
    .filter((r) => r.status === 'approved')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (isLoading) {
    return <div className="skeleton h-[70vh] w-full" />;
  }

  return (
    <div>
      <HeroCarousel movies={movies.slice(0, 5)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">
            {t('home.latestReviews')}
          </h2>
          <ReviewList reviews={latestReviews} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">
            {t('home.browseGrid')}
          </h2>
          <MovieGrid movies={movies} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-3">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-primary-50/90 mb-6 max-w-xl mx-auto">{t('home.ctaSubtitle')}</p>
          <Link to="/login">
            <Button variant="ghost" className="bg-white text-primary-700 border-none hover:bg-white/90">
              {t('home.ctaButton')}
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
