import { getCategoryLabel } from "../../data/productEnrichment";
import { SORT_OPTIONS, RATING_FILTERS } from "../../utils/productFilters";
import styles from "./ProductFilters.module.css";

function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  sort,
  onSortChange,
  minRating,
  onMinRatingChange,
  resultCount,
  onReset,
}) {
  return (
    <aside className={styles.filters} aria-label="Product filters">
      <div className={styles.searchRow}>
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          className={styles.search}
          placeholder="Search collection…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.field}>
          <label htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All categories" : getCategoryLabel(cat)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="filter-sort">Sort</label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="filter-rating">Rating</label>
          <select
            id="filter-rating"
            value={minRating}
            onChange={(e) => onMinRatingChange(Number(e.target.value))}
          >
            {RATING_FILTERS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.meta}>
        <span>
          {resultCount} {resultCount === 1 ? "piece" : "pieces"}
        </span>
        <button type="button" className={styles.reset} onClick={onReset}>
          Clear filters
        </button>
      </div>
    </aside>
  );
}

export { ProductFilters };
