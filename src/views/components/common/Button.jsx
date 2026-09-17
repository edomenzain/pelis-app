import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow hover:from-primary-400 hover:to-primary-500',
  accent:
    'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-glow-accent hover:from-accent-400 hover:to-accent-500',
  ghost: 'bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10',
  danger: 'bg-red-600/90 text-white hover:bg-red-500',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as = 'button',
  disabled = false,
  ...props
}) {
  const Component = motion[as] ?? motion.button;
  return (
    <Component
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 min-h-[44px] font-semibold text-sm transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
