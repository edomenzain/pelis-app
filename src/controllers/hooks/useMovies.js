import { useEffect, useState } from 'react';
import { movieService } from '../../models/services/movieService';

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = () => {
    setMovies(movieService.getAll());
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { movies, isLoading, refresh };
}

export function usePendingMovies() {
  const [pending, setPending] = useState([]);

  const refresh = () => {
    setPending(movieService.getPending());
  };

  useEffect(() => {
    refresh();
  }, []);

  return { pending, refresh };
}

export function useMovie(id) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = () => {
    setMovie(movieService.getById(id));
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { movie, isLoading, refresh };
}
