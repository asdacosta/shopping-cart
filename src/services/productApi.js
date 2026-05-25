const API_BASE = "https://fakestoreapi.com";
const CACHE_TTL_MS = 5 * 60 * 1000;

let productsCache = null;
let productsCacheTime = 0;

async function fetchJson(url) {
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export async function fetchAllProducts({ force = false } = {}) {
  const now = Date.now();
  if (!force && productsCache && now - productsCacheTime < CACHE_TTL_MS) {
    return productsCache;
  }

  const products = await fetchJson(`${API_BASE}/products`);
  productsCache = products;
  productsCacheTime = now;
  return products;
}

export async function fetchProductById(id) {
  const products = await fetchAllProducts();
  const product = products.find((p) => p.id === Number(id));
  if (product) return product;
  return fetchJson(`${API_BASE}/products/${id}`);
}

export async function fetchCategories() {
  return fetchJson(`${API_BASE}/products/categories`);
}

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function clearProductCache() {
  productsCache = null;
  productsCacheTime = 0;
}
