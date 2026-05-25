import styles from "./Spinner.module.css";

function Spinner({ label = "Loading", size = "md" }) {
  return (
    <div
      className={`${styles.wrapper} ${styles[size]}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.ring} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Spinner };
