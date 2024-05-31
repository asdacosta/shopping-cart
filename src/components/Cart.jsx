import cartStyles from "../stylesheets/Cart.module.css";
import { Link } from "react-router-dom";
import { CartItem } from "./CartItem";
import { useState, useEffect, useContext } from "react";
import { ShopContext, PageContext } from "./HomePage";
import { ids } from "./ids";

function Cart() {
  const [response, setResponse] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const { allAdded, allQuantity } = useContext(ShopContext);
  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        encodeURIComponent("men's clothing"),
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (response) {
      calc();
    }
  }, [allAdded, allQuantity]);

  if (!response) {
    return;
  }

  function highlightShop() {
    setPage("shop");
  }

  const cartItems = allAdded.map((added, index) => {
    if (added) {
      return <CartItem key={ids[index]} itemResponse={response[index]} />;
    }
  });

  const isEmpty = !allAdded.includes(true);

  function calc() {
    let total = 0;
    allAdded.forEach((item, index) => {
      if (item) {
        total += allQuantity[index] * response[index].price;
      }
    });
    const trimmedTotal = parseFloat(total.toFixed(2));
    setSubTotal(trimmedTotal);
  }

  return (
    <section className={cartStyles.cover}>
      <h2 className={cartStyles.header1}>Items</h2>
      {isEmpty ? (
        <section className={cartStyles.items}>
          <p>Your cart is empty.</p>
          <Link className={cartStyles.link} to="/shop">
            <button onClick={highlightShop}>Add Items</button>
          </Link>
        </section>
      ) : (
        <section>{cartItems}</section>
      )}

      <h2 className={cartStyles.header2}>Summary</h2>
      <section className={cartStyles.summary}>
        <p>
          <span>SubTotal: $ {subTotal}</span>
        </p>
        <button>Proceed to Checkout</button>
      </section>
    </section>
  );
}

export { Cart };
