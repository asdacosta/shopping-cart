import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopProvider";
import { formatPrice } from "../../services/productApi";
import { QuantityStepper } from "../ui/QuantityStepper";
import styles from "./CartLineItem.module.css";

function CartLineItem({ product, quantity }) {
  const { setCartQuantity, removeFromCart } = useShop();

  return (
    <article className={styles.line}>
      <Link to={`/product/${product.id}`} className={styles.image}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div className={styles.details}>
        <Link to={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>
        <p className={styles.unitPrice}>{formatPrice(product.price)} each</p>
        <QuantityStepper
          quantity={quantity}
          onDecrement={() => setCartQuantity(product.id, quantity - 1)}
          onIncrement={() => setCartQuantity(product.id, quantity + 1)}
        />
      </div>
      <div className={styles.aside}>
        <p className={styles.lineTotal}>
          {formatPrice(product.price * quantity)}
        </p>
        <button
          type="button"
          className={styles.remove}
          onClick={() => removeFromCart(product.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export { CartLineItem };
