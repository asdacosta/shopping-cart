import { StarRating } from "../ui/StarRating";
import styles from "./ProductReviews.module.css";

function ProductReviews({ reviews, aggregateRate, aggregateCount }) {
  return (
    <section className={styles.reviews} aria-labelledby="reviews-heading">
      <div className={styles.header}>
        <h2 id="reviews-heading" className="display-heading">
          Client Reviews
        </h2>
        <StarRating
          rate={aggregateRate}
          count={aggregateCount}
          size="md"
        />
      </div>
      <ul className={styles.list}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.review}>
            <div className={styles.reviewHead}>
              <span className={styles.author}>{review.author}</span>
              <span className={styles.date}>{review.date}</span>
            </div>
            <StarRating rate={review.rating} showCount={false} size="sm" />
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { ProductReviews };
