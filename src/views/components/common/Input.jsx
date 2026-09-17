export default function Input({ label, id, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full min-h-[44px] rounded-lg bg-cinema-surface-2 border border-white/10 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:border-primary-400 transition-colors duration-200 outline-none ${className}`}
        {...props}
      />
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
