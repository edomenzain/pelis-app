import reviewsSeed from '../mocks/reviews.json';
import { seedStorage, writeStorage } from './storageService';
import { movieService } from './movieService';

const KEY = 'reviews';

function getAll() {
  return seedStorage(KEY, reviewsSeed);
}

export const reviewService = {
  getAll() {
    return getAll();
  },
  getByMovie(movieId, { onlyApproved = true } = {}) {
    return getAll()
      .filter((r) => r.movieId === movieId && (!onlyApproved || r.status === 'approved'))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getByUser(userId) {
    return getAll()
      .filter((r) => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getPending() {
    return getAll()
      .filter((r) => r.status === 'pending')
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  },
  create({ movieId, userId, userName, userAvatar, rating, text }) {
    const all = getAll();
    const review = {
      id: `r${Date.now()}`,
      movieId,
      userId,
      userName,
      userAvatar,
      rating,
      text,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    writeStorage(KEY, [...all, review]);
    return review;
  },
  update(id, patch) {
    const all = getAll();
    const updated = all.map((r) => (r.id === id ? { ...r, ...patch } : r));
    writeStorage(KEY, updated);
    const changed = updated.find((r) => r.id === id);
    if (changed) movieService.recalculateRating(changed.movieId, updated);
    return changed;
  },
  remove(id) {
    const all = getAll();
    const target = all.find((r) => r.id === id);
    const updated = all.filter((r) => r.id !== id);
    writeStorage(KEY, updated);
    if (target) movieService.recalculateRating(target.movieId, updated);
  },
  approve(id) {
    return this.update(id, { status: 'approved' });
  },
  reject(id) {
    return this.update(id, { status: 'rejected' });
  },
};
