import { Link, NavLink, useLocation } from "react-router-dom";
import { useShop } from "../../context/ShopProvider";
import styles from "./Nav.module.css";

function Nav() {
  const { cartCount, wishlist } = useShop();
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`} aria-label="Main navigation">
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">◆</span>
          <span className={styles.brandText}>EverTrend</span>
        </Link>

        <div className={styles.links}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Wishlist
            {wishlist.length > 0 && (
              <span className={styles.badge}>{wishlist.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Account
          </NavLink>
        </div>

        <div className={styles.actions}>
          <Link
            to="/cart"
            className={styles.cartBtn}
            aria-label={`Cart, ${cartCount} items`}
          >
            <svg viewBox="0 0 576 512" aria-hidden="true" className={styles.icon}>
              <path
                fill="currentColor"
                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
              />
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </Link>
        </div>
      </nav>
      {location.pathname === "/shop" && (
        <div className={styles.promoStrip} role="note">
          <p className="container">
            Complimentary shipping on orders over $75 · Use code{" "}
            <strong>WELCOME15</strong> at checkout
          </p>
        </div>
      )}
    </header>
  );
}

export { Nav };
