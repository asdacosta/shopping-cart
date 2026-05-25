import { Link } from "react-router-dom";
import { formatPrice } from "../../services/productApi";
import { Button } from "../ui/Button";
import styles from "./OrderSummary.module.css";

function OrderSummary({
  subtotal,
  shipping,
  tax,
  discount,
  promo,
  total,
  freeShippingRemaining,
  promoCode,
  onPromoApply,
  onPromoClear,
  promoInput,
  onPromoInputChange,
  promoError,
  checkoutLabel = "Proceed to checkout",
  checkoutTo = "/checkout",
  showCheckout = true,
}) {
  return (
    <aside className={styles.summary} aria-labelledby="summary-heading">
      <h2 id="summary-heading" className={styles.heading}>
        Order Summary
      </h2>

      {freeShippingRemaining > 0 && subtotal > 0 && (
        <p className={styles.shippingNote}>
          Add {formatPrice(freeShippingRemaining)} more for complimentary shipping
        </p>
      )}

      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className={`${styles.row} ${styles.discount}`}>
            <dt>Promo {promo?.label && `(${promo.label})`}</dt>
            <dd>−{formatPrice(discount)}</dd>
          </div>
        )}
        <div className={styles.row}>
          <dt>Shipping</dt>
          <dd>{shipping === 0 && subtotal > 0 ? "Complimentary" : formatPrice(shipping)}</dd>
        </div>
        <div className={styles.row}>
          <dt>Estimated tax</dt>
          <dd>{formatPrice(tax)}</dd>
        </div>
        <div className={`${styles.row} ${styles.total}`}>
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      {onPromoApply && (
        <form
          className={styles.promo}
          onSubmit={(e) => {
            e.preventDefault();
            onPromoApply();
          }}
        >
          <label htmlFor="promo-code" className="sr-only">
            Promo code
          </label>
          <input
            id="promo-code"
            type="text"
            placeholder="Promo code"
            value={promoInput}
            onChange={(e) => onPromoInputChange(e.target.value)}
            disabled={!!promoCode}
          />
          {promoCode ? (
            <Button type="button" variant="ghost" size="sm" onClick={onPromoClear}>
              Remove
            </Button>
          ) : (
            <Button type="submit" variant="secondary" size="sm">
              Apply
            </Button>
          )}
        </form>
      )}
      {promoError && <p className={styles.promoError} role="alert">{promoError}</p>}

      {showCheckout && (
        <Link to={checkoutTo} className={styles.checkout}>
          <Button variant="primary" size="lg" className={styles.checkoutBtn}>
            {checkoutLabel}
          </Button>
        </Link>
      )}
    </aside>
  );
}

export { OrderSummary };
