import cartStyles from "../stylesheets/Cart.module.css";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "./HomePage";

function CartItem({ itemResponse }) {
  const { allAdded, setAllAdded, allQuantity, setAllQuantity } =
    useContext(ShopContext);
  const [quantity, setQuantity] = useState(allQuantity[itemResponse?.id - 1]);
  const [added, setAdded] = useState(allAdded[itemResponse?.id - 1]);

  useEffect(() => {
    if (!itemResponse) {
      return;
    }
    updateContext();
  }, [added, quantity]);

  function updateContext() {
    const newAllAdded = [...allAdded];
    const index = itemResponse.id - 1;
    newAllAdded[index] = added;
    setAllAdded(newAllAdded);

    const newAllQuantity = [...allQuantity];
    newAllQuantity[index] = quantity;
    setAllQuantity(newAllQuantity);
  }

  function triggerShow() {
    setShowDescription(true);
  }

  function triggerHide() {
    setShowDescription(false);
  }

  function triggerAdded() {
    setAdded(true);
    updateContext();
  }

  function decrement() {
    setQuantity((prevQuantity) => {
      if (prevQuantity === 1) {
        setAdded(false);
        updateContext();
        return prevQuantity;
      }
      return prevQuantity - 1;
    });
  }

  function increment() {
    setQuantity((prevQuantity) => prevQuantity + 1);
    updateContext();
  }

  return (
    <section className={cartStyles.cart}>
      <div>
        <img src={itemResponse.image} alt={itemResponse.title} />
      </div>
      <p className={cartStyles.title}>{itemResponse.title}</p>
      <p className={cartStyles.priceTag}>$ {itemResponse.price}</p>
      <p className={cartStyles.added}>
        <svg
          onClick={decrement}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
        </svg>
        <span>{quantity}</span>
        <svg
          onClick={increment}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
      </p>
    </section>
  );
}

export { CartItem };
