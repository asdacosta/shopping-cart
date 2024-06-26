import navStyles from "../stylesheets/Nav.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PageContext, ShopContext } from "./HomePage";

function Nav() {
  const { page, setPage } = useContext(PageContext);
  const { allAdded, allQuantity } = useContext(ShopContext);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    let cartItems = 0;
    allAdded.forEach((entry, index) => {
      if (entry) {
        cartItems += allQuantity[index];
      }
    });

    setCartQuantity(cartItems);
  }, [allAdded, allQuantity]);

  function highlightShop() {
    setPage("shop");
  }
  function highlightHome() {
    setPage("home");
  }
  function highlightNone() {
    setPage("");
  }

  return (
    <nav className={navStyles.nav}>
      <span onClick={highlightHome} className={navStyles.brandName}>
        <Link to="/" className={navStyles.link}>
          EverTrend
        </Link>
      </span>
      <span
        onClick={highlightHome}
        className={navStyles.home}
        style={page === "home" ? { borderBottom: "0.1rem solid white" } : null}
      >
        <Link to="/" className={navStyles.link}>
          Home
        </Link>
      </span>
      <span
        onClick={highlightShop}
        className={navStyles.shop}
        style={page === "shop" ? { borderBottom: "0.1rem solid white" } : null}
      >
        <Link to="shop" className={navStyles.link}>
          Shop
        </Link>
      </span>
      <span onClick={highlightNone} className={navStyles.cart}>
        <Link to="cart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
        </Link>
        <span
          style={cartQuantity > 0 ? { display: "inline" } : { display: "none" }}
          className={navStyles.quantity}
        >
          {cartQuantity}
        </span>
      </span>
    </nav>
  );
}

export { Nav };
