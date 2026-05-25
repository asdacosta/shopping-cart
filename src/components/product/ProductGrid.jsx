import { ProductCard } from "./ProductCard";
import { Skeleton } from "../ui/Skeleton";
import styles from "./ProductGrid.module.css";

function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className={styles.grid} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <Skeleton height="100%" className={styles.skeletonImage} />
          <Skeleton height="1rem" width="60%" />
          <Skeleton height="0.75rem" width="40%" />
        </div>
      ))}
    </div>
  );
}

function ProductGrid({ products, loading, showAddButton = true }) {
  if (loading) {
    return <ProductGridSkeleton />;
  }

  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} showAddButton={showAddButton} />
        </li>
      ))}
    </ul>
  );
}

export { ProductGrid, ProductGridSkeleton };
