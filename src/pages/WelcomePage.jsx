import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProductGrid } from "../components/product/ProductGrid";
import { Button } from "../components/ui/Button";
import { TRUST_BADGES } from "../data/productEnrichment";
import styles from "./WelcomePage.module.css";

function WelcomePage() {
  const { featuredProducts, loading, error } = useProducts();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className="label-caps">Spring / Summer 2026</p>
          <h1 className={`display-heading ${styles.heroTitle}`}>
            Curated pieces for the
            <em> discerning </em>
            wardrobe
          </h1>
          <p className={styles.heroLead}>
            EverTrend brings together refined silhouettes, honest materials,
            and timeless design — a boutique experience, reimagined for today.
          </p>
          <div className={styles.heroActions}>
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Explore collection
              </Button>
            </Link>
            <Link to="/shop?featured=1">
              <Button variant="secondary" size="lg">
                View featured
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroGlow} aria-hidden="true" />
      </section>

      <section className={`container ${styles.featured}`}>
        <div className={styles.sectionHead}>
          <h2 className="display-heading">Featured selection</h2>
          <Link to="/shop" className={styles.viewAll}>
            View all →
          </Link>
        </div>
        {error ? (
          <p className={styles.error} role="alert">
            Unable to load collection. Please try again shortly.
          </p>
        ) : (
          <ProductGrid
            products={featuredProducts}
            loading={loading}
            showAddButton
          />
        )}
      </section>

      <section className={styles.categories}>
        <div className="container">
          <h2 className="display-heading">Shop by category</h2>
          <div className={styles.categoryGrid}>
            {[
              { label: "Men", slug: "men's clothing", accent: "copper" },
              { label: "Women", slug: "women's clothing", accent: "rose" },
              { label: "Electronics", slug: "electronics", accent: "slate" },
              { label: "Jewelry", slug: "jewelery", accent: "gold" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                to={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className={`${styles.categoryCard} ${styles[cat.accent]}`}
              >
                <span className="label-caps">{cat.label}</span>
                <span className={styles.categoryCta}>Discover →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`container ${styles.trust}`}>
        {TRUST_BADGES.map((b) => (
          <div key={b.label} className={styles.trustCard}>
            <h3>{b.label}</h3>
            <p>{b.detail}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export { WelcomePage };
