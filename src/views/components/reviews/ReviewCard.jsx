import { motion } from 'framer-motion';
import StarRating from './StarRating';
import { formatDate } from '../../../utils/format';
import { useTranslation } from 'react-i18next';

export default function ReviewCard({ review, index = 0, actions = null }) {
  const { i18n } = useTranslation();
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="glass rounded-xl p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-slate-100">{review.userName}</p>
            <span className="text-xs text-slate-500">
              {formatDate(review.createdAt, i18n.language)}
            </span>
          </div>
          <StarRating value={review.rating} readOnly size="sm" />
          <p className="mt-2 text-sm text-slate-300">{review.text}</p>
          {actions && <div className="mt-3 flex gap-2">{actions}</div>}
        </div>
      </div>
    </motion.article>
  );
}
