import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopProvider";
import { fetchAllProducts, formatPrice } from "../services/productApi";
import { useCartTotals } from "../hooks/useCartTotals";
import { Button } from "../components/ui/Button";
import { OrderSummary } from "../components/cart/OrderSummary";
import { EmptyState } from "../components/ui/EmptyState";
import { Spinner } from "../components/ui/Spinner";
import styles from "./CheckoutPage.module.css";

const STEPS = ["Shipping", "Payment", "Review"];

function CheckoutPage() {
  const { clearCart, promoCode } = useShop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const totals = useCartTotals(products);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validateStep() {
    if (step === 0) {
      return (
        form.email &&
        form.firstName &&
        form.lastName &&
        form.address &&
        form.city &&
        form.zip
      );
    }
    if (step === 1) {
      return form.cardName && form.cardNumber && form.expiry && form.cvc;
    }
    return true;
  }

  function nextStep() {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      const id = `ET-${Date.now().toString(36).toUpperCase()}`;
      setOrderId(id);
      setComplete(true);
      clearCart();
      const orders = JSON.parse(localStorage.getItem("evertrend-orders") || "[]");
      orders.unshift({
        id,
        date: new Date().toISOString(),
        total: totals.total,
        items: totals.itemCount,
      });
      localStorage.setItem("evertrend-orders", JSON.stringify(orders.slice(0, 10)));
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" label="Loading checkout" />
      </div>
    );
  }

  if (totals.lines.length === 0 && !complete) {
    return (
      <div className={`container ${styles.page}`}>
        <EmptyState
          title="Nothing to checkout"
          description="Add items to your bag before proceeding."
          actionLabel="Continue shopping"
          actionTo="/shop"
        />
      </div>
    );
  }

  if (complete) {
    return (
      <div className={`container ${styles.success}`}>
        <div className={styles.successCard} role="status">
          <span className={styles.successIcon} aria-hidden="true">✓</span>
          <h1 className="display-heading">Thank you</h1>
          <p>Order <strong>{orderId}</strong> is confirmed.</p>
          <p className={styles.successDetail}>
            A confirmation has been sent to {form.email || "your inbox"}.
          </p>
          <div className={styles.successActions}>
            <Link to="/account">
              <Button variant="primary">Track order</Button>
            </Link>
            <Link to="/shop">
              <Button variant="secondary">Continue shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h1 className="display-heading">Checkout</h1>

      <ol className={styles.steps} aria-label="Checkout progress">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={
              i === step
                ? styles.stepActive
                : i < step
                  ? styles.stepDone
                  : styles.step
            }
            aria-current={i === step ? "step" : undefined}
          >
            <span className={styles.stepNum}>{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className={styles.layout}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
          }}
        >
          {step === 0 && (
            <fieldset>
              <legend>Shipping details</legend>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  autoComplete="email"
                />
              </label>
              <div className={styles.row}>
                <label>
                  First name
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    autoComplete="given-name"
                  />
                </label>
                <label>
                  Last name
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label>
                Address
                <input
                  required
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  autoComplete="street-address"
                />
              </label>
              <div className={styles.row}>
                <label>
                  City
                  <input
                    required
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    autoComplete="address-level2"
                  />
                </label>
                <label>
                  ZIP
                  <input
                    required
                    value={form.zip}
                    onChange={(e) => updateField("zip", e.target.value)}
                    autoComplete="postal-code"
                  />
                </label>
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend>Payment</legend>
              <p className={styles.demoNote}>
                Demo checkout — no real charges are made.
              </p>
              <label>
                Name on card
                <input
                  required
                  value={form.cardName}
                  onChange={(e) => updateField("cardName", e.target.value)}
                  autoComplete="cc-name"
                />
              </label>
              <label>
                Card number
                <input
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={form.cardNumber}
                  onChange={(e) => updateField("cardNumber", e.target.value)}
                  autoComplete="cc-number"
                />
              </label>
              <div className={styles.row}>
                <label>
                  Expiry
                  <input
                    required
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(e) => updateField("expiry", e.target.value)}
                    autoComplete="cc-exp"
                  />
                </label>
                <label>
                  CVC
                  <input
                    required
                    inputMode="numeric"
                    value={form.cvc}
                    onChange={(e) => updateField("cvc", e.target.value)}
                    autoComplete="cc-csc"
                  />
                </label>
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <section className={styles.review}>
              <h2>Review your order</h2>
              <ul>
                {totals.lines.map(({ product, quantity, lineTotal }) => (
                  <li key={product.id}>
                    <span>
                      {product.title} × {quantity}
                    </span>
                    <span>{formatPrice(lineTotal)}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.shipTo}>
                Shipping to {form.firstName} {form.lastName}, {form.address},{" "}
                {form.city} {form.zip}
              </p>
            </section>
          )}

          <div className={styles.formActions}>
            {step > 0 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
            )}
            <Link to="/cart" className={styles.backLink}>
              <Button type="button" variant="ghost">
                Edit bag
              </Button>
            </Link>
            <Button type="submit" variant="primary" disabled={!validateStep()}>
              {step === STEPS.length - 1 ? "Place order" : "Continue"}
            </Button>
          </div>
        </form>

        <OrderSummary
          {...totals}
          promoCode={promoCode}
          showCheckout={false}
        />
      </div>
    </div>
  );
}

export { CheckoutPage };
