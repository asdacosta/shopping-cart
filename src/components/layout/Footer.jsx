import { Link } from "react-router-dom";
import { TRUST_BADGES } from "../../data/productEnrichment";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <section className={styles.trust}>
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className={styles.trustItem}>
              <span className={styles.trustLabel}>{badge.label}</span>
              <span className={styles.trustDetail}>{badge.detail}</span>
            </div>
          ))}
        </section>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} EverTrend. Curated with intention.
          </p>
          <nav className={styles.footerNav} aria-label="Footer">
            <Link to="/shop">Shop</Link>
            <Link to="/account">Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
