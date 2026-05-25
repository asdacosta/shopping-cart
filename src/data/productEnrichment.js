const SIZE_POOL = ["XS", "S", "M", "L", "XL"];
const COLOR_POOL = ["Obsidian", "Sandstone", "Copper", "Ivory", "Slate"];

const REVIEW_TEMPLATES = [
  {
    author: "Elena M.",
    text: "Exceptional quality and fit. The fabric feels substantial without being heavy — exactly what I hoped for.",
    rating: 5,
  },
  {
    author: "James R.",
    text: "Beautiful craftsmanship. Shipping was fast and packaging felt premium. Will order again.",
    rating: 5,
  },
  {
    author: "Sofia K.",
    text: "Lovely piece overall. Sizing runs slightly generous — I'd size down if between sizes.",
    rating: 4,
  },
  {
    author: "Marcus T.",
    text: "The color is even richer in person. Great value for this level of finish.",
    rating: 5,
  },
];

export const CATEGORY_LABELS = {
  "men's clothing": "Men",
  "women's clothing": "Women",
  electronics: "Electronics",
  jewelery: "Jewelry",
};

export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}

export function getProductVariants(product) {
  const seed = product.id;
  const sizeCount = 3 + (seed % 3);
  const colorCount = 2 + (seed % 3);
  return {
    sizes: SIZE_POOL.slice(0, sizeCount),
    colors: COLOR_POOL.slice(0, colorCount),
  };
}

export function getProductReviews(product) {
  const count = 3 + (product.id % 2);
  return REVIEW_TEMPLATES.slice(0, count).map((review, i) => ({
    id: `${product.id}-review-${i}`,
    ...review,
    date: new Date(2025, (product.id + i) % 12, 8 + i).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric", year: "numeric" }
    ),
  }));
}

export function isFeaturedProduct(product) {
  return product.rating.rate >= 4.5 || product.id % 5 === 0;
}

export const TRUST_BADGES = [
  { label: "Free returns", detail: "30-day hassle-free" },
  { label: "Secure checkout", detail: "256-bit encryption" },
  { label: "Express shipping", detail: "2–4 business days" },
];

export const PROMO_CODES = {
  WELCOME15: { discount: 0.15, label: "15% off" },
  LUXE10: { discount: 0.1, label: "10% off" },
};
