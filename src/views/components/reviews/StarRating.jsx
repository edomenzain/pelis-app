import { motion } from 'framer-motion';
import Icon from '../common/Icon';

export default function StarRating({ value, onChange, readOnly = false, size = 'md' }) {
  const stars = Array.from({ length: 10 }, (_, i) => i + 1);
  const iconSize = size === 'lg' ? 28 : size === 'sm' ? 16 : 20;

  return (
    <div
      className="flex items-center gap-1"
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Calificación ${value} de 10`}
    >
      {stars.map((star) => (
        <motion.button
          key={star}
          type="button"
          role={readOnly ? undefined : 'radio'}
          aria-checked={!readOnly && star === value}
          aria-label={`${star} de 10`}
          disabled={readOnly}
          whileHover={readOnly ? {} : { scale: 1.25 }}
          whileTap={readOnly ? {} : { scale: 0.9 }}
          onClick={() => onChange && onChange(star)}
          className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} p-0.5`}
        >
          <Icon
            name="star"
            size={iconSize}
            filled={star <= value}
            className={`transition-colors duration-150 ${
              star <= value ? 'text-accent-400' : 'text-white/15'
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
}
