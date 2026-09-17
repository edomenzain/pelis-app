import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../controllers/store/authStore';
import { reviewService } from '../../models/services/reviewService';
import { movieService } from '../../models/services/movieService';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import GenrePill from '../components/common/GenrePill';
import StarRating from '../components/reviews/StarRating';
import MovieFormModal from '../components/admin/MovieFormModal';
import Icon from '../components/common/Icon';

const ALL_GENRES = [
  'Ciencia Ficción',
  'Drama',
  'Suspenso',
  'Misterio',
  'Acción',
  'Romance',
  'Comedia',
  'Fantasía',
];

export default function Profile() {
  const { t } = useTranslation();
  const { user, isAuthenticated, updateProfile } = useAuthStore();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitMovieOpen, setIsSubmitMovieOpen] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? '', bio: user?.bio ?? '' });
  const [, forceUpdate] = useState(0);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const myReviews = reviewService.getByUser(user.id);
  const myMovies = movieService.getBySubmitter(user.id);

  function submitMovie(data) {
    movieService.create(data, { status: 'pending', submittedBy: user.id });
    setIsSubmitMovieOpen(false);
    forceUpdate((n) => n + 1);
  }

  function toggleGenre(genre) {
    const current = user.favoriteGenres ?? [];
    const next = current.includes(genre)
      ? current.filter((g) => g !== genre)
      : [...current, genre];
    updateProfile({ favoriteGenres: next });
  }

  function saveProfile(e) {
    e.preventDefault();
    updateProfile(form);
    setIsEditOpen(false);
  }

  function deleteReview(id) {
    reviewService.remove(id);
    forceUpdate((n) => n + 1);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-10"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-primary-500 shadow-glow flex-shrink-0"
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-display font-bold text-white">{user.name}</h1>
          <p className="text-slate-400 text-sm mb-2">{user.email}</p>
          <p className="text-slate-300">{user.bio || 'Sin biografía aún.'}</p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => {
              setForm({ name: user.name, bio: user.bio ?? '' });
              setIsEditOpen(true);
            }}
          >
            <Icon name="edit" size={16} />
            {t('profile.editProfile')}
          </Button>
        </div>
      </motion.div>

      <section className="mb-10">
        <h2 className="text-lg font-display font-semibold text-white mb-3">
          {t('profile.favoriteGenres')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {ALL_GENRES.map((genre) => (
            <GenrePill
              key={genre}
              label={genre}
              selected={(user.favoriteGenres ?? []).includes(genre)}
              onClick={() => toggleGenre(genre)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-display font-semibold text-white mb-3">
          {t('profile.history')}
        </h2>
        {myReviews.length === 0 ? (
          <p className="text-slate-500 text-sm">{t('movie.noReviews')}</p>
        ) : (
          <div className="space-y-3">
            {myReviews.map((review) => {
              const movie = movieService.getById(review.movieId);
              return (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <Link to={`/movie/${review.movieId}`} className="flex-shrink-0">
                    <img
                      src={movie?.posterPath}
                      alt={movie?.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-100 truncate">{movie?.title}</p>
                    <StarRating value={review.rating} readOnly size="sm" />
                    <p className="text-sm text-slate-400 truncate">{review.text}</p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                        review.status === 'approved'
                          ? 'bg-primary-500/20 text-primary-400'
                          : review.status === 'pending'
                            ? 'bg-accent-500/20 text-accent-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {review.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteReview(review.id)}
                    aria-label={`${t('profile.delete')} reseña`}
                    className="cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 text-red-400 flex-shrink-0"
                  >
                    <Icon name="delete" size={20} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-display font-semibold text-white">
            {t('profile.myMovies')}
          </h2>
          <Button variant="accent" onClick={() => setIsSubmitMovieOpen(true)}>
            <Icon name="add" size={16} />
            {t('profile.proposeMovie')}
          </Button>
        </div>
        {myMovies.length === 0 ? (
          <p className="text-slate-500 text-sm">{t('profile.noMovies')}</p>
        ) : (
          <div className="space-y-3">
            {myMovies.map((movie) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-100 truncate">{movie.title}</p>
                  <span
                    className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                      movie.status === 'approved'
                        ? 'bg-primary-500/20 text-primary-400'
                        : movie.status === 'pending'
                          ? 'bg-accent-500/20 text-accent-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {movie.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <MovieFormModal
        isOpen={isSubmitMovieOpen}
        onClose={() => setIsSubmitMovieOpen(false)}
        onSave={submitMovie}
        showRating={false}
        title={t('profile.proposeMovie')}
      />

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title={t('profile.editProfile')}>
        <form onSubmit={saveProfile} className="space-y-4">
          <Input
            id="profile-name"
            label={t('auth.name')}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <div>
            <label htmlFor="profile-bio" className="block text-sm font-medium text-slate-300 mb-1.5">
              {t('profile.bio')}
            </label>
            <textarea
              id="profile-bio"
              rows={3}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="w-full rounded-lg bg-cinema-surface-2 border border-white/10 px-4 py-2.5 text-slate-100 outline-none focus:border-primary-400 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>
              {t('profile.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('profile.save')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
