import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-display font-extrabold text-gradient mb-4"
      >
        404
      </motion.h1>
      <p className="text-slate-400 mb-8">Esta escena no existe en nuestro guion.</p>
      <Link to="/" className="text-primary-400 font-semibold hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
