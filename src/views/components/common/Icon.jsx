export default function Icon({ name, size = 20, filled = false, weight = 400, className = '', style, ...rest }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined inline-block align-middle leading-none select-none ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
        ...style,
      }}
      {...rest}
    >
      {name}
    </span>
  );
}
