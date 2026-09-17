import { useTranslation } from 'react-i18next';
import ReviewCard from './ReviewCard';

export default function ReviewList({ reviews }) {
  const { t } = useTranslation();

  if (reviews.length === 0) {
    return <p className="text-slate-500 text-sm py-6">{t('movie.noReviews')}</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <ReviewCard key={review.id} review={review} index={index} />
      ))}
    </div>
  );
}
