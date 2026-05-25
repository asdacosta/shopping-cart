import { useEffect, useState } from "react";
import { useShop } from "../context/ShopProvider";
import { fetchAllProducts } from "../services/productApi";
import { useCartTotals } from "../hooks/useCartTotals";
import { PROMO_CODES } from "../data/productEnrichment";
import { CartLineItem } from "../components/cart/CartLineItem";
import { OrderSummary } from "../components/cart/OrderSummary";
import { EmptyState } from "../components/ui/EmptyState";
import { Spinner } from "../components/ui/Spinner";
import styles from "./CartPage.module.css";

function CartPage() {
  const { promoCode, setPromoCode, clearPromoCode } = useShop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const totals = useCartTotals(products);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!PROMO_CODES[code]) {
      setPromoError("Invalid promo code. Try WELCOME15 or LUXE10.");
      return;
    }
    setPromoError("");
    setPromoCode(code);
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" label="Loading cart" />
      </div>
    );
  }

  if (totals.lines.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <h1 className="display-heading">Your bag</h1>
        <EmptyState
          title="Your bag is empty"
          description="Discover pieces crafted for lasting style — your next favorite awaits."
          actionLabel="Explore collection"
          actionTo="/shop"
          icon="◇"
        />
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1 className="display-heading">Your bag</h1>
        <p className={styles.count}>
          {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"}
        </p>
      </header>

      <div className={styles.layout}>
        <section className={styles.lines} aria-label="Cart items">
          {totals.lines.map(({ product, quantity }) => (
            <CartLineItem
              key={product.id}
              product={product}
              quantity={quantity}
            />
          ))}
        </section>

        <OrderSummary
          {...totals}
          promoCode={promoCode}
          promoInput={promoInput}
          onPromoInputChange={setPromoInput}
          onPromoApply={applyPromo}
          onPromoClear={() => {
            clearPromoCode();
            setPromoInput("");
            setPromoError("");
          }}
          promoError={promoError}
        />
      </div>
    </div>
  );
}

export { CartPage };
