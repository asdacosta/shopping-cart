import { useMemo } from "react";
import { useShop } from "../context/ShopProvider";
import { PROMO_CODES } from "../data/productEnrichment";

const SHIPPING_THRESHOLD = 75;
const SHIPPING_FLAT = 8.5;
const TAX_RATE = 0.0825;

export function useCartTotals(products) {
  const { cart, promoCode } = useShop();

  return useMemo(() => {
    const lines = Object.entries(cart)
      .map(([id, quantity]) => {
        const product = products.find((p) => p.id === Number(id));
        if (!product) return null;
        return {
          product,
          quantity,
          lineTotal: product.price * quantity,
        };
      })
      .filter(Boolean);

    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const shipping =
      subtotal === 0
        ? 0
        : subtotal >= SHIPPING_THRESHOLD
          ? 0
          : SHIPPING_FLAT;
    const promo = promoCode ? PROMO_CODES[promoCode.toUpperCase()] : null;
    const discount = promo ? subtotal * promo.discount : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = taxable * TAX_RATE;
    const total = taxable + shipping + tax;

    return {
      lines,
      subtotal,
      shipping,
      tax,
      discount,
      promo,
      total,
      itemCount: lines.reduce((n, l) => n + l.quantity, 0),
      freeShippingRemaining: Math.max(0, SHIPPING_THRESHOLD - subtotal),
    };
  }, [cart, products, promoCode]);
}
