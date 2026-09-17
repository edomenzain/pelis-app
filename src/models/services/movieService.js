import moviesSeed from '../mocks/movies.json';
import { readStorage, seedStorage, writeStorage } from './storageService';

const KEY = 'movies_v3';

function getAll() {
  return seedStorage(KEY, moviesSeed);
}

function getPublished() {
  return getAll().filter((movie) => !movie.status || movie.status === 'approved');
}

function sortByRatingDesc(movies) {
  return [...movies].sort((a, b) => b.rating - a.rating);
}

export const movieService = {
  getAll() {
    return sortByRatingDesc(getPublished());
  },
  getById(id) {
    return getAll().find((movie) => movie.id === id) ?? null;
  },
  getByGenre(genre) {
    return sortByRatingDesc(getPublished().filter((movie) => movie.genres.includes(genre)));
  },
  search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return sortByRatingDesc(
      getPublished().filter((movie) => movie.title.toLowerCase().includes(q)),
    );
  },
  getTopRated(limit = 10) {
    return sortByRatingDesc(getPublished()).slice(0, limit);
  },
  getLatest(limit = 8) {
    return [...getPublished()].sort((a, b) => b.year - a.year).slice(0, limit);
  },
  getAllGenres() {
    const set = new Set();
    getPublished().forEach((movie) => movie.genres.forEach((g) => set.add(g)));
    return [...set].sort();
  },
  getPending() {
    return getAll()
      .filter((movie) => movie.status === 'pending')
      .sort((a, b) => new Date(a.createdAt ?? 0) - new Date(b.createdAt ?? 0));
  },
  getBySubmitter(userId) {
    return getAll().filter((movie) => movie.submittedBy === userId);
  },
  create(movie, { status = 'approved', submittedBy = null } = {}) {
    const all = getAll();
    const newMovie = {
      ...movie,
      id: `m${Date.now()}`,
      status,
      submittedBy,
      createdAt: new Date().toISOString(),
    };
    const updated = [...all, newMovie];
    writeStorage(KEY, updated);
    return newMovie;
  },
  update(id, patch) {
    const all = getAll();
    const updated = all.map((movie) => (movie.id === id ? { ...movie, ...patch } : movie));
    writeStorage(KEY, updated);
    return updated.find((m) => m.id === id);
  },
  remove(id) {
    const all = getAll();
    writeStorage(
      KEY,
      all.filter((movie) => movie.id !== id),
    );
  },
  approve(id) {
    return this.update(id, { status: 'approved' });
  },
  reject(id) {
    return this.update(id, { status: 'rejected' });
  },
  recalculateRating(movieId, reviews) {
    const approved = reviews.filter((r) => r.movieId === movieId && r.status === 'approved');
    if (approved.length === 0) return;
    const avg = approved.reduce((sum, r) => sum + r.rating, 0) / approved.length;
    this.update(movieId, { rating: Math.round(avg * 10) / 10 });
  },
};

export function readMoviesRaw() {
  return readStorage(KEY, moviesSeed);
}
