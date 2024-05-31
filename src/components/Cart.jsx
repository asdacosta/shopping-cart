import cartStyles from "../stylesheets/Cart.module.css";
import { Link } from "react-router-dom";
import { CartItem } from "./CartItem";
import { useState, useEffect, useContext } from "react";
import { ShopContext } from "./HomePage";
import { ids } from "./ids";

function Cart() {
  const [response, setResponse] = useState(null);
  const { allAdded } = useContext(ShopContext);

  useEffect(() => {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        encodeURIComponent("men's clothing"),
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setResponse(response);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!response) {
    return;
  }

  const cartItems = allAdded.map((added, index) => {
    if (added) {
      return <CartItem key={ids[index]} itemResponse={response[index]} />;
    }
  });

  const isEmpty = !allAdded.includes(true);

  return (
    <section className={cartStyles.cover}>
      <h2 className={cartStyles.header1}>Items</h2>
      {isEmpty ? (
        <section className={cartStyles.items}>
          <p>Your cart is empty.</p>
          <Link className={cartStyles.link} to="/shop">
            <button>Add Items</button>
          </Link>
        </section>
      ) : (
        <section>{cartItems}</section>
      )}

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
