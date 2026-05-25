import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopProvider";
import { formatPrice } from "../../services/productApi";
import { getCategoryLabel, isFeaturedProduct } from "../../data/productEnrichment";
import { StarRating } from "../ui/StarRating";
import { Button } from "../ui/Button";
import styles from "./ProductCard.module.css";

function ProductCard({ product, showAddButton = true }) {
  const { addToCart, toggleWishlist, isInWishlist, getCartQuantity } = useShop();
  const inCart = getCartQuantity(product.id) > 0;
  const wishlisted = isInWishlist(product.id);

  function handleAdd(e) {
    e.preventDefault();
    addToCart(product.id, 1);
  }

  function handleWishlist(e) {
    e.preventDefault();
    toggleWishlist(product.id);
  }

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.mediaLink}>
        <div className={styles.imageWrap}>
          {isFeaturedProduct(product) && (
            <span className={styles.badge}>Featured</span>
          )}
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>
      </Link>

      <button
        type="button"
        className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ""}`}
        onClick={handleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <div className={styles.body}>
        <span className="label-caps">{getCategoryLabel(product.category)}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>
        <StarRating rate={product.rating.rate} count={product.rating.count} size="sm" />
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {showAddButton && (
            <Button
              variant={inCart ? "secondary" : "primary"}
              size="sm"
              onClick={handleAdd}
            >
              {inCart ? "In cart" : "Add"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export { ProductCard };
