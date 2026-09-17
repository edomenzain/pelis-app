import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useMovie } from '../../controllers/hooks/useMovies';
import { useReviews } from '../../controllers/hooks/useReviews';
import { useAuthStore } from '../../controllers/store/authStore';
import { reviewService } from '../../models/services/reviewService';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import Icon from '../components/common/Icon';
import { formatDuration } from '../../utils/format';

export default function MovieDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { movie, isLoading } = useMovie(id);
  const { reviews, refresh } = useReviews(id);
  const { user, isAuthenticated } = useAuthStore();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  if (isLoading) return <div className="skeleton h-[60vh] w-full" />;
  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-slate-400">Película no encontrada.</p>
        <Link to="/" className="text-primary-400 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  function handleReviewSubmit({ rating, text }) {
    reviewService.create({
      movieId: movie.id,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating,
      text,
    });
    refresh();
  }

  return (
    <div>
      <div ref={heroRef} className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <motion.img
          src={movie.backdropPath}
          alt=""
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative z-10 flex flex-col md:flex-row gap-8">
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={movie.posterPath}
          alt={movie.title}
          className="w-40 sm:w-56 rounded-xl shadow-2xl flex-shrink-0 mx-auto md:mx-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 pt-4"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-2">
            {movie.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-slate-400">
            <span>{movie.year}</span>
            <span>·</span>
            <span>{formatDuration(movie.duration)}</span>
            <span>·</span>
            <span>{movie.genres.join(', ')}</span>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full bg-accent-500/15 border border-accent-400/40 px-4 py-2 mb-6"
          >
            <Icon name="star" size={20} filled className="text-accent-400" />
            <span className="text-xl font-bold text-accent-300">{movie.rating.toFixed(1)}</span>
            <span className="text-sm text-slate-400">/ 10</span>
          </motion.div>

          <h2 className="text-lg font-semibold text-white mb-2">{t('movie.synopsis')}</h2>
          <p className="text-slate-300 leading-relaxed mb-6">{movie.synopsis}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">{t('movie.director')}</h3>
              <p className="text-slate-100">{movie.director}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">{t('movie.cast')}</h3>
              <p className="text-slate-100">{movie.cast.join(', ')}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-display font-bold mb-6">{t('movie.reviews')}</h2>

        {isAuthenticated ? (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              {t('movie.writeReview')}
            </h3>
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
        ) : (
          <div className="glass rounded-xl p-5 mb-8 text-center">
            <p className="text-slate-300 mb-3">{t('movie.loginToReview')}</p>
            <Link to="/login" className="text-primary-400 font-semibold hover:underline">
              {t('nav.login')}
            </Link>
          </div>
        )}

        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
