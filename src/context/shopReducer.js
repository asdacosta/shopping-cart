export const initialShopState = {
  cart: {},
  wishlist: [],
  recentViews: [],
  promoCode: null,
};

export function shopReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      return { ...state, ...action.payload };
    }
    case "ADD_TO_CART": {
      const { productId, quantity = 1 } = action.payload;
      const current = state.cart[productId] ?? 0;
      return {
        ...state,
        cart: {
          ...state.cart,
          [productId]: Math.min(99, current + quantity),
        },
      };
    }
    case "SET_CART_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        const next = { ...state.cart };
        delete next[productId];
        return { ...state, cart: next };
      }
      return {
        ...state,
        cart: { ...state.cart, [productId]: Math.min(99, quantity) },
      };
    }
    case "REMOVE_FROM_CART": {
      const next = { ...state.cart };
      delete next[action.payload.productId];
      return { ...state, cart: next };
    }
    case "CLEAR_CART":
      return { ...state, cart: {} };
    case "TOGGLE_WISHLIST": {
      const { productId } = action.payload;
      const exists = state.wishlist.includes(productId);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
      };
    }
    case "ADD_RECENT_VIEW": {
      const { productId } = action.payload;
      const filtered = state.recentViews.filter((id) => id !== productId);
      return {
        ...state,
        recentViews: [productId, ...filtered].slice(0, 8),
      };
    }
    case "SET_PROMO": {
      return { ...state, promoCode: action.payload.code };
    }
    case "CLEAR_PROMO":
      return { ...state, promoCode: null };
    default:
      return state;
  }
}
