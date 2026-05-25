import styles from "./Button.module.css";

const VARIANTS = ["primary", "secondary", "ghost", "danger"];
const SIZES = ["sm", "md", "lg"];

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  const variantClass = VARIANTS.includes(variant) ? styles[variant] : styles.primary;
  const sizeClass = SIZES.includes(size) ? styles[size] : styles.md;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
