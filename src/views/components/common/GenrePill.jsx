import { motion } from 'framer-motion';

export default function GenrePill({ label, selected = false, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      animate={{ scale: selected ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`cursor-pointer select-none rounded-full border px-4 py-2 min-h-[44px] text-sm font-medium transition-colors duration-200 ${
        selected
          ? 'bg-primary-500 border-primary-400 text-white shadow-glow'
          : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
      }`}
    >
      {label}
    </motion.button>
  );
}
