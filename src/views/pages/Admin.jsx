import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../controllers/store/authStore';
import { useMovies, usePendingMovies } from '../../controllers/hooks/useMovies';
import { usePendingReviews } from '../../controllers/hooks/useReviews';
import { movieService } from '../../models/services/movieService';
import { reviewService } from '../../models/services/reviewService';
import MovieTable from '../components/admin/MovieTable';
import MovieFormModal from '../components/admin/MovieFormModal';
import ModerationQueue from '../components/admin/ModerationQueue';
import PendingMovies from '../components/admin/PendingMovies';
import Button from '../components/common/Button';
import Icon from '../components/common/Icon';

export default function Admin() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const { movies, refresh: refreshMovies } = useMovies();
  const { pending, refresh: refreshPending } = usePendingReviews();
  const { pending: pendingMovies, refresh: refreshPendingMovies } = usePendingMovies();
  const [editingMovie, setEditingMovie] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!isAuthenticated || user.role !== 'admin') return <Navigate to="/" replace />;

  function handleSave(data) {
    if (editingMovie) {
      movieService.update(editingMovie.id, data);
    } else {
      movieService.create(data);
    }
    refreshMovies();
    setIsFormOpen(false);
    setEditingMovie(null);
  }

  function handleDelete(movie) {
    if (window.confirm(`¿Eliminar "${movie.title}"? Esta acción no se puede deshacer.`)) {
      movieService.remove(movie.id);
      refreshMovies();
    }
  }

  function handleApprove(id) {
    reviewService.approve(id);
    refreshPending();
    refreshMovies();
  }

  function handleReject(id) {
    reviewService.reject(id);
    refreshPending();
  }

  function handleApproveMovie(id) {
    movieService.approve(id);
    refreshPendingMovies();
    refreshMovies();
  }

  function handleRejectMovie(id) {
    movieService.reject(id);
    refreshPendingMovies();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
      <h1 className="text-3xl font-display font-bold text-white">{t('admin.title')}</h1>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold text-white">{t('admin.movies')}</h2>
          <Button
            variant="accent"
            onClick={() => {
              setEditingMovie(null);
              setIsFormOpen(true);
            }}
          >
            <Icon name="add" size={16} />
            {t('admin.addMovie')}
          </Button>
        </div>
        <MovieTable
          movies={movies}
          onEdit={(movie) => {
            setEditingMovie(movie);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
        />
      </section>

      <section>
        <h2 className="text-xl font-display font-semibold text-white mb-4">
          {t('admin.pendingMovies')}
        </h2>
        <PendingMovies
          pending={pendingMovies}
          onApprove={handleApproveMovie}
          onReject={handleRejectMovie}
        />
      </section>

      <section>
        <h2 className="text-xl font-display font-semibold text-white mb-4">
          {t('admin.moderation')}
        </h2>
        <ModerationQueue pending={pending} onApprove={handleApprove} onReject={handleReject} />
      </section>

      <MovieFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingMovie(null);
        }}
        onSave={handleSave}
        movie={editingMovie}
      />
    </div>
  );
}
