import { useContext, useEffect, useState } from "react";
import itemStyles from "../stylesheets/Item.module.css";
import { Link } from "react-router-dom";
import { ShopContext } from "./HomePage";

function Item({ itemResponse, displayButton = "auto" }) {
  const [showDescription, setShowDescription] = useState(false);
  const [pointer, setPointer] = useState("auto");
  const { allAdded, setAllAdded, allQuantity, setAllQuantity } =
    useContext(ShopContext);
  const [quantity, setQuantity] = useState(allQuantity[itemResponse?.id - 1]);
  const [added, setAdded] = useState(allAdded[itemResponse?.id - 1]);

  useEffect(() => {
    if (!itemResponse) {
      setPointer("none");
    }
  }, [itemResponse]);

  useEffect(() => {
    updateContext();
  }, [added, quantity]);

  function updateContext() {
    if (!itemResponse) {
      return;
    }
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
  }

  function decrement() {
    setQuantity((prevQuantity) => {
      if (prevQuantity === 1) {
        setAdded(false);
        return prevQuantity;
      }
      return prevQuantity - 1;
    });
  }

  function increment() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  return (
    <section className={itemStyles.item} style={{ pointerEvents: pointer }}>
      <span
        className={itemStyles.info}
        onMouseOver={triggerShow}
        onMouseOut={triggerHide}
      >
        {showDescription ? (
          <p>
            {itemResponse ? itemResponse.description.split(".")[0] + "." : ""}
          </p>
        ) : (
          itemResponse && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          )
        )}
      </span>
      {!showDescription ? (
        <Link to={itemResponse && `/itemHome/${itemResponse.id}`}>
          <div className={itemStyles.itemImage}>
            {itemResponse ? (
              <img
                src={itemResponse ? itemResponse.image : ""}
                alt={itemResponse ? itemResponse.title : ""}
              />
            ) : (
              <span className={itemStyles.emptyBox}>EverTrend</span>
            )}
          </div>
        </Link>
      ) : (
        <div className={itemStyles.itemImage}></div>
      )}

      <div className={itemStyles.itemDetails}>
        <p>{itemResponse ? itemResponse.title : ""}</p>
        <p>$ {itemResponse ? itemResponse.price : ""}</p>
        {!added ? (
          <button onClick={triggerAdded} style={{ display: displayButton }}>
            Add to Cart
          </button>
        ) : (
          <p className={itemStyles.added}>
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
        )}
      </div>
    </section>
  );
}

export { Item };
