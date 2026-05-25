import styles from "./QuantityStepper.module.css";

function QuantityStepper({
  quantity,
  onDecrement,
  onIncrement,
  min = 1,
  max = 99,
  label = "Quantity",
}) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.control}
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles.value} aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className={styles.control}
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export { QuantityStepper };
