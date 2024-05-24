import cartStyles from "../stylesheets/Cart.module.css";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <section className={cartStyles.cover}>
      <h2 className={cartStyles.header1}>Items</h2>
      <section className={cartStyles.items}>
        <p>Your cart is empty.</p>
        <Link className={cartStyles.link} to="/shop">
          Add Items
        </Link>
      </section>

      <h2 className={cartStyles.header2}>Summary</h2>
      <section className={cartStyles.summary}>
        <p>
          <span>SubTotal: </span>
          <span>0</span>
        </p>
        <button>Proceed to Checkout</button>
      </section>
    </section>
  );
}

export { Cart };
