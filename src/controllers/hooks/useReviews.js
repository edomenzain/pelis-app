import { useEffect, useState } from 'react';
import { reviewService } from '../../models/services/reviewService';

export function useReviews(movieId) {
  const [reviews, setReviews] = useState([]);

  const refresh = () => {
    setReviews(reviewService.getByMovie(movieId));
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return { reviews, refresh };
}

export function usePendingReviews() {
  const [pending, setPending] = useState([]);

  const refresh = () => {
    setPending(reviewService.getPending());
  };

  useEffect(() => {
    refresh();
  }, []);

  return { pending, refresh };
}
