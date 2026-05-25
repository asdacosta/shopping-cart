import { Link } from "react-router-dom";
import { Button } from "./Button";
import styles from "./EmptyState.module.css";

function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  icon,
}) {
  return (
    <section className={styles.empty} aria-labelledby="empty-title">
      {icon && <div className={styles.icon} aria-hidden="true">{icon}</div>}
      <h2 id="empty-title" className={styles.title}>
        {title}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo}>
          <Button variant="primary" size="md">
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </section>
  );
}

export { EmptyState };
