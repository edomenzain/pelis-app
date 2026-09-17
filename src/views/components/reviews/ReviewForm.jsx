import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import StarRating from './StarRating';
import Button from '../common/Button';

export default function ReviewForm({ onSubmit }) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) {
      setError('Selecciona una calificación de 0 a 10.');
      return;
    }
    if (!text.trim()) {
      setError('Escribe un comentario para tu reseña.');
      return;
    }
    onSubmit({ rating, text: text.trim() });
    setRating(0);
    setText('');
    setError('');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-4 sm:p-5 space-y-4">
      <div>
        <p className="text-sm font-medium text-slate-300 mb-1.5">{t('movie.yourRating')}</p>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      <div>
        <motion.textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={t('movie.reviewPlaceholder')}
          rows={3}
          animate={{
            borderColor: focused ? '#33AE64' : 'rgba(255,255,255,0.1)',
            boxShadow: focused ? '0 0 0 3px rgba(51,174,100,0.25)' : '0 0 0 0px rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.2 }}
          className="w-full rounded-lg bg-cinema-surface-2 border px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none resize-none"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      {sent && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="status"
          className="text-sm text-primary-400"
        >
          {t('movie.pendingNotice')}
        </motion.p>
      )}

      <Button type="submit" variant="primary">
        {t('movie.submit')}
      </Button>
    </form>
  );
}
