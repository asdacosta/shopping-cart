import styles from "./Skeleton.module.css";

function Skeleton({ className = "", width, height, rounded = "md" }) {
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <span
      className={`${styles.skeleton} ${styles[rounded]} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}

export { Skeleton };
