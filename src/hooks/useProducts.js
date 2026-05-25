import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAllProducts } from "../services/productApi";
import { isFeaturedProduct } from "../data/productEnrichment";

const DEFAULT_SORT = "featured";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAllProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Failed to load products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (minRating > 0) {
      list = list.filter((p) => p.rating.rate >= minRating);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "featured":
      default:
        list.sort((a, b) => {
          const af = isFeaturedProduct(a) ? 1 : 0;
          const bf = isFeaturedProduct(b) ? 1 : 0;
          if (bf !== af) return bf - af;
          return b.rating.rate - a.rating.rate;
        });
    }

    return list;
  }, [products, category, search, sort, minRating]);

  const featuredProducts = useMemo(
    () => products.filter(isFeaturedProduct).slice(0, 4),
    [products]
  );

  const resetFilters = useCallback(() => {
    setSearch("");
    setCategory("all");
    setSort(DEFAULT_SORT);
    setMinRating(0);
  }, []);

  return {
    products,
    filteredProducts,
    featuredProducts,
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
  };
}
