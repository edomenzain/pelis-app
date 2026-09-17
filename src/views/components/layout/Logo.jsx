import { motion } from 'framer-motion';

export default function Logo({ className = '' }) {
  return (
    <motion.div
      className={`flex items-center gap-2 group cursor-pointer ${className}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.svg
        width="34"
        height="34"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.rect
          x="4"
          y="14"
          width="26"
          height="22"
          rx="4"
          fill="#1E9250"
          variants={{ rest: { y: 14 }, hover: { y: 12 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        />
        <motion.path
          d="M30 20 L42 13 V37 L30 30 Z"
          fill="#F97A0B"
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: -8 },
          }}
          style={{ transformOrigin: '30px 25px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        />
        <motion.circle
          cx="17"
          cy="25"
          r="5"
          fill="#0B0D0C"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.15 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        />
        <rect x="6" y="8" width="4" height="6" rx="1" fill="#FBBF24" />
        <rect x="13" y="8" width="4" height="6" rx="1" fill="#1E9250" />
        <rect x="20" y="8" width="4" height="6" rx="1" fill="#F97A0B" />
      </motion.svg>
      <span className="font-display font-extrabold text-xl tracking-tight">
        <span className="text-primary-400">Pelis</span>
        <span className="text-accent-400">Mania</span>
      </span>
    </motion.div>
  );
}
