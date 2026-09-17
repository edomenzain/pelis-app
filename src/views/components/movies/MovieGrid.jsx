import MovieCard from './MovieCard';

export default function MovieGrid({ movies, emptyMessage = 'No se encontraron películas.' }) {
  if (movies.length === 0) {
    return <p className="text-center text-slate-500 py-12">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}
