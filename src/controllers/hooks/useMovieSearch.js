import { useEffect, useMemo, useState } from 'react';
import { movieService } from '../../models/services/movieService';

export function useMovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setResults(query.trim() ? movieService.search(query).slice(0, 6) : []);
    }, 150);
    return () => clearTimeout(handle);
  }, [query]);

  const isOpen = useMemo(() => query.trim().length > 0, [query]);

  return { query, setQuery, results, isOpen };
}
