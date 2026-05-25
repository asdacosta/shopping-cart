import styles from "./StarRating.module.css";

function StarRating({ rate, count, size = "md", showCount = true }) {
  const fullStars = Math.round(rate);
  const stars = Array.from({ length: 5 }, (_, i) => i < fullStars);

  return (
    <div
      className={`${styles.rating} ${styles[size]}`}
      aria-label={`Rated ${rate} out of 5${count != null ? `, ${count} reviews` : ""}`}
    >
      <span className={styles.stars} aria-hidden="true">
        {stars.map((filled, i) => (
          <svg key={i} viewBox="0 0 20 20" className={filled ? styles.filled : styles.empty}>
            <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
          </svg>
        ))}
      </span>
      <span className={styles.value}>{rate.toFixed(1)}</span>
      {showCount && count != null && (
        <span className={styles.count}>({count})</span>
      )}
    </div>
  );
}

export { StarRating };
