import { useEffect, useState } from "react";
import { useShop } from "../context/ShopProvider";
import { fetchAllProducts } from "../services/productApi";
import { ProductGrid } from "../components/product/ProductGrid";
import { EmptyState } from "../components/ui/EmptyState";
import { Spinner } from "../components/ui/Spinner";
import styles from "./WishlistPage.module.css";

function WishlistPage() {
  const { wishlist } = useShop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts()
      .then((all) => {
        setProducts(all.filter((p) => wishlist.includes(p.id)));
      })
      .finally(() => setLoading(false));
  }, [wishlist]);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p className="label-caps">Saved for later</p>
        <h1 className="display-heading">Wishlist</h1>
      </header>

      {loading && (
        <div className={styles.loading}>
          <Spinner label="Loading wishlist" />
        </div>
      )}

      {!loading && products.length === 0 && (
        <EmptyState
          title="No saved pieces yet"
          description="Tap the heart on any product to build your personal wishlist."
          actionLabel="Browse collection"
          actionTo="/shop"
          icon="♡"
        />
      )}

      {!loading && products.length > 0 && (
        <ProductGrid products={products} loading={false} />
      )}
    </div>
  );
}

export { WishlistPage };
