import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useShop } from "../context/ShopProvider";
import { fetchAllProducts, fetchProductById, formatPrice } from "../services/productApi";
import {
  getCategoryLabel,
  getProductReviews,
  getProductVariants,
  TRUST_BADGES,
} from "../data/productEnrichment";
import { StarRating } from "../components/ui/StarRating";
import { Button } from "../components/ui/Button";
import { QuantityStepper } from "../components/ui/QuantityStepper";
import { Spinner } from "../components/ui/Spinner";
import { ProductReviews } from "../components/product/ProductReviews";
import { RelatedProducts } from "../components/product/RelatedProducts";
import styles from "./ProductPage.module.css";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    setCartQuantity,
    getCartQuantity,
    toggleWishlist,
    isInWishlist,
    addRecentView,
  } = useShop();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const cartQty = product ? getCartQuantity(product.id) : 0;
  const variants = product ? getProductVariants(product) : { sizes: [], colors: [] };
  const reviews = product ? getProductReviews(product) : [];

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([fetchProductById(id), fetchAllProducts()])
      .then(([item, catalog]) => {
        if (cancelled) return;
        if (!item) {
          setError("Product not found");
          return;
        }
        setProduct(item);
        setAllProducts(catalog);
        const v = getProductVariants(item);
        setSize(v.sizes[0] ?? "");
        setColor(v.colors[0] ?? "");
        addRecentView(item.id);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load product");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" label="Loading product" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`container ${styles.error}`}>
        <p role="alert">{error ?? "Product not found"}</p>
        <Link to="/shop">
          <Button variant="secondary">Back to shop</Button>
        </Link>
      </div>
    );
  }

  const related = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  function handleAdd() {
    addToCart(product.id, 1);
  }

  function handleBuyNow() {
    addToCart(product.id, 1);
    navigate("/checkout");
  }

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.title}</span>
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={product.image} alt={product.title} />
          </div>
        </div>

        <div className={styles.info}>
          <span className="label-caps">{getCategoryLabel(product.category)}</span>
          <h1 className="display-heading">{product.title}</h1>
          <StarRating
            rate={product.rating.rate}
            count={product.rating.count}
          />
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.description}>{product.description}</p>

          <fieldset className={styles.variantGroup}>
            <legend>Size</legend>
            <div className={styles.variantOptions} role="radiogroup" aria-label="Size">
              {variants.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={size === s}
                  className={size === s ? styles.variantActive : styles.variant}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.variantGroup}>
            <legend>Color</legend>
            <div className={styles.variantOptions} role="radiogroup" aria-label="Color">
              {variants.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={color === c}
                  className={color === c ? styles.variantActive : styles.variant}
                  onClick={() => setColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          <div className={styles.actions}>
            {cartQty > 0 ? (
              <QuantityStepper
                quantity={cartQty}
                onDecrement={() => setCartQuantity(product.id, cartQty - 1)}
                onIncrement={() => setCartQuantity(product.id, cartQty + 1)}
              />
            ) : (
              <Button variant="primary" size="lg" onClick={handleAdd}>
                Add to cart
              </Button>
            )}
            <Button variant="secondary" size="lg" onClick={handleBuyNow}>
              Buy now
            </Button>
            <button
              type="button"
              className={`${styles.wishlist} ${isInWishlist(product.id) ? styles.wishlisted : ""}`}
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={isInWishlist(product.id)}
            >
              {isInWishlist(product.id) ? "Saved" : "Save"}
            </button>
          </div>

          <ul className={styles.trust}>
            {TRUST_BADGES.map((b) => (
              <li key={b.label}>
                <strong>{b.label}</strong> — {b.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProductReviews
        reviews={reviews}
        aggregateRate={product.rating.rate}
        aggregateCount={product.rating.count}
      />

      <RelatedProducts products={related.length ? related : allProducts} currentId={product.id} />
    </div>
  );
}

export { ProductPage };
