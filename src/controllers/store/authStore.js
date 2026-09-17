import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../../models/services/authService';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      login: (email, password) => {
        const user = authService.login(email, password);
        set({ user, isAuthenticated: true, error: null });
        return user;
      },
      register: (data) => {
        const user = authService.register(data);
        set({ user, isAuthenticated: true, error: null });
        return user;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (patch) =>
        set((state) => {
          if (!state.user) return state;
          const updated = authService.updateProfile(state.user.id, patch);
          return { user: updated };
        }),
    }),
    { name: 'pelismania:session' },
  ),
);
