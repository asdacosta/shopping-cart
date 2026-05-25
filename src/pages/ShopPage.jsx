import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProductFilters } from "../components/product/ProductFilters";
import { ProductGrid } from "../components/product/ProductGrid";
import { EmptyState } from "../components/ui/EmptyState";
import { Spinner } from "../components/ui/Spinner";
import styles from "./ShopPage.module.css";

function ShopPage() {
  const [searchParams] = useSearchParams();
  const {
    filteredProducts,
    categories,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    minRating,
    setMinRating,
    resetFilters,
  } = useProducts();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
    const featured = searchParams.get("featured");
    if (featured) setSort("featured");
  }, [searchParams]);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p className="label-caps">The collection</p>
        <h1 className="display-heading">Shop</h1>
        <p className={styles.lead}>
          Search, filter, and sort our full curated catalog.
        </p>
      </header>

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        sort={sort}
        onSortChange={setSort}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        resultCount={filteredProducts.length}
        onReset={resetFilters}
      />

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {loading && (
        <div className={styles.loadingCenter}>
          <Spinner size="lg" label="Loading products" />
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <EmptyState
          title="No pieces match"
          description="Try adjusting your filters or search terms to discover more of the collection."
          actionLabel="Clear filters"
          onAction={resetFilters}
          icon="◇"
        />
      )}

      {!loading && filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} loading={false} />
      )}
    </div>
  );
}

export { ShopPage };
