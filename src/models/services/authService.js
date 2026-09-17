import usersSeed from '../mocks/users.json';
import { seedStorage, writeStorage } from './storageService';

const KEY = 'users';

function getAll() {
  return seedStorage(KEY, usersSeed);
}

export const authService = {
  login(email, password) {
    const user = getAll().find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    );
    if (!user) throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
    const { password: _pwd, ...safeUser } = user;
    return safeUser;
  },
  register({ name, email, password }) {
    const all = getAll();
    if (all.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error('Ya existe una cuenta con ese correo.');
    }
    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      role: 'user',
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
      bio: '',
      favoriteGenres: [],
    };
    writeStorage(KEY, [...all, newUser]);
    const { password: _pwd, ...safeUser } = newUser;
    return safeUser;
  },
  updateProfile(userId, patch) {
    const all = getAll();
    const updated = all.map((u) => (u.id === userId ? { ...u, ...patch } : u));
    writeStorage(KEY, updated);
    const { password: _pwd, ...safeUser } = updated.find((u) => u.id === userId);
    return safeUser;
  },
};
