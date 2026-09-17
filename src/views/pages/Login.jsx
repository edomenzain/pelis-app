import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../controllers/store/authStore';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Logo from '../components/layout/Logo';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, register } = useAuthStore();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (mode === 'login') {
        login(form.email, form.password);
      } else {
        register(form);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  const quickAccessUsers = [
    { label: 'Admin', email: 'admin@pelismania.com', password: 'admin123' },
    { label: 'Usuario', email: 'valentina@correo.com', password: 'cine2024' },
  ];

  function handleQuickAccess(email, password) {
    setError('');
    try {
      login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>

      <motion.div
        layout
        className="glass rounded-2xl p-6 sm:p-8"
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={mode}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="text-2xl font-display font-bold text-white mb-6 text-center"
          >
            {mode === 'login' ? t('auth.loginTitle') : t('auth.registerTitle')}
          </motion.h1>
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input
              id="name"
              label={t('auth.name')}
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
            />
          )}
          <Input
            id="email"
            type="email"
            label={t('auth.email')}
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
          <Input
            id="password"
            type="password"
            label={t('auth.password')}
            required
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
          />

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" className="w-full">
            {mode === 'login' ? t('auth.loginButton') : t('auth.registerButton')}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="cursor-pointer text-primary-400 font-semibold hover:underline"
          >
            {mode === 'login' ? t('auth.createOne') : t('auth.signIn')}
          </button>
        </p>

        {mode === 'login' && (
          <div className="mt-6">
            <p className="text-center text-xs text-slate-500 mb-2">Acceso rápido (demo)</p>
            <div className="flex gap-2 justify-center">
              {quickAccessUsers.map((u) => (
                <button
                  key={u.email}
                  type="button"
                  onClick={() => handleQuickAccess(u.email, u.password)}
                  className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
