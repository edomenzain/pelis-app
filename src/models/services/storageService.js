const PREFIX = 'pelismania:';

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // localStorage no disponible (modo privado, cuota excedida, etc.)
  }
}

export function seedStorage(key, seedValue) {
  const existing = window.localStorage.getItem(PREFIX + key);
  if (existing === null) {
    writeStorage(key, seedValue);
    return seedValue;
  }
  return readStorage(key, seedValue);
}
