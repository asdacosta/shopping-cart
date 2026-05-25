import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { initialShopState, shopReducer } from "./shopReducer";
import { PROMO_CODES } from "../data/productEnrichment";

const STORAGE_KEY = "evertrend-shop-v2";

const ShopContext = createContext(null);

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      cart: parsed.cart ?? {},
      wishlist: parsed.wishlist ?? [],
      recentViews: parsed.recentViews ?? [],
      promoCode: parsed.promoCode ?? null,
    };
  } catch {
    return null;
  }
}

function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialShopState);

  useEffect(() => {
    const persisted = loadPersistedState();
    if (persisted) {
      dispatch({ type: "HYDRATE", payload: persisted });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          cart: state.cart,
          wishlist: state.wishlist,
          recentViews: state.recentViews,
          promoCode: state.promoCode,
        })
      );
    } catch {
      /* storage full or unavailable */
    }
  }, [state.cart, state.wishlist, state.recentViews, state.promoCode]);

  const addToCart = useCallback((productId, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { productId, quantity } });
  }, []);

  const setCartQuantity = useCallback((productId, quantity) => {
    dispatch({ type: "SET_CART_QUANTITY", payload: { productId, quantity } });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleWishlist = useCallback((productId) => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: { productId } });
  }, []);

  const addRecentView = useCallback((productId) => {
    dispatch({ type: "ADD_RECENT_VIEW", payload: { productId } });
  }, []);

  const setPromoCode = useCallback((code) => {
    dispatch({ type: "SET_PROMO", payload: { code } });
  }, []);

  const clearPromoCode = useCallback(() => {
    dispatch({ type: "CLEAR_PROMO" });
  }, []);

  const cartCount = useMemo(
    () => Object.values(state.cart).reduce((sum, qty) => sum + qty, 0),
    [state.cart]
  );

  const isInWishlist = useCallback(
    (productId) => state.wishlist.includes(productId),
    [state.wishlist]
  );

  const getCartQuantity = useCallback(
    (productId) => state.cart[productId] ?? 0,
    [state.cart]
  );

  const promoDetails = state.promoCode
    ? PROMO_CODES[state.promoCode.toUpperCase()] ?? null
    : null;

  const value = useMemo(
    () => ({
      ...state,
      cartCount,
      promoDetails,
      addToCart,
      setCartQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      addRecentView,
      setPromoCode,
      clearPromoCode,
      isInWishlist,
      getCartQuantity,
    }),
    [
      state,
      cartCount,
      promoDetails,
      addToCart,
      setCartQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      addRecentView,
      setPromoCode,
      clearPromoCode,
      isInWishlist,
      getCartQuantity,
    ]
  );

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
}

function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return ctx;
}

export { ShopProvider, useShop };
