import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const emptyForm = {
  title: '',
  posterPath: '',
  backdropPath: '',
  synopsis: '',
  director: '',
  cast: '',
  genres: '',
  year: new Date().getFullYear(),
  duration: 100,
  rating: 0,
  trailerId: '',
};

export default function MovieFormModal({
  isOpen,
  onClose,
  onSave,
  movie,
  showRating = true,
  title,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (movie) {
      setForm({
        ...movie,
        cast: movie.cast.join(', '),
        genres: movie.genres.join(', '),
      });
    } else {
      setForm(emptyForm);
    }
  }, [movie, isOpen]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...form,
      year: Number(form.year),
      duration: Number(form.duration),
      rating: Number(form.rating),
      cast: form.cast.split(',').map((c) => c.trim()).filter(Boolean),
      genres: form.genres.split(',').map((g) => g.trim()).filter(Boolean),
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title ?? (movie ? 'Editar Película' : 'Agregar Película')}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          id="title"
          label="Título"
          required
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
        />
        <Input
          id="posterPath"
          label="URL del Poster"
          required
          value={form.posterPath}
          onChange={(e) => update('posterPath', e.target.value)}
        />
        <Input
          id="backdropPath"
          label="URL del Backdrop"
          value={form.backdropPath}
          onChange={(e) => update('backdropPath', e.target.value)}
        />
        <div>
          <label htmlFor="synopsis" className="block text-sm font-medium text-slate-300 mb-1.5">
            Sinopsis
          </label>
          <textarea
            id="synopsis"
            rows={3}
            required
            value={form.synopsis}
            onChange={(e) => update('synopsis', e.target.value)}
            className="w-full rounded-lg bg-cinema-surface-2 border border-white/10 px-4 py-2.5 text-slate-100 outline-none focus:border-primary-400 resize-none"
          />
        </div>
        <Input
          id="director"
          label="Director"
          required
          value={form.director}
          onChange={(e) => update('director', e.target.value)}
        />
        <Input
          id="cast"
          label="Reparto (separado por comas)"
          value={form.cast}
          onChange={(e) => update('cast', e.target.value)}
        />
        <Input
          id="genres"
          label="Géneros (separado por comas)"
          value={form.genres}
          onChange={(e) => update('genres', e.target.value)}
        />
        <div className={`grid gap-3 ${showRating ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <Input
            id="year"
            type="number"
            label="Año"
            value={form.year}
            onChange={(e) => update('year', e.target.value)}
          />
          <Input
            id="duration"
            type="number"
            label="Duración (min)"
            value={form.duration}
            onChange={(e) => update('duration', e.target.value)}
          />
          {showRating && (
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              label="Rating"
              value={form.rating}
              onChange={(e) => update('rating', e.target.value)}
            />
          )}
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
