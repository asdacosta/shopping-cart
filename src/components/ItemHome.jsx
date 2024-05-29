import { useContext, useState, useEffect } from "react";
import { ShopContext } from "./HomePage";
import { useParams } from "react-router-dom";
import itemHomeStyles from "../stylesheets/ItemHome.module.css";

function ItemHome() {
  const { id } = useParams();
  const [itemResponse, setItemResponse] = useState(null);
  const { allAdded, allQuantity, setAllAdded, setAllQuantity } =
    useContext(ShopContext);
  const [quantity, setQuantity] = useState(allQuantity[id - 1]);
  const [added, setAdded] = useState(allAdded[id - 1]);

  useEffect(() => {
    if (!itemResponse) {
      return;
    }
    updateContext();
  }, [added, quantity]);

  useEffect(() => {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        encodeURIComponent("men's clothing"),
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => {
        switch (id) {
          case "1":
            setItemResponse(response[0]);
            break;
          case "2":
            setItemResponse(response[1]);
            break;
          case "3":
            setItemResponse(response[2]);
            break;
          case "4":
            setItemResponse(response[3]);
            break;
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!itemResponse) {
    return null;
  }

  function updateContext() {
    const newAllAdded = [...allAdded];
    const index = itemResponse.id - 1;
    newAllAdded[index] = added;
    setAllAdded(newAllAdded);

    const newAllQuantity = [...allQuantity];
    newAllQuantity[index] = quantity;
    setAllQuantity(newAllQuantity);
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
    <section className={itemHomeStyles.itemHome}>
      <section className={itemHomeStyles.image}>
        <img src={itemResponse.image} alt={itemResponse.title} />
        <p>{itemResponse.title}</p>
      </section>
      <section className={itemHomeStyles.details}>
        <p>
          Category: <span>{itemResponse.category}</span>
        </p>
        <p>
          Rating: <span>{itemResponse.rating.rate}</span>
        </p>
        <p>
          Purchases: <span>{itemResponse.rating.count}</span>
        </p>
        <p>
          Price: <span>${itemResponse.price}</span>
        </p>
        {!added ? (
          <button onClick={triggerAdded}>Add to Cart</button>
        ) : (
          <p className={itemHomeStyles.added}>
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
      </section>
      <section className={itemHomeStyles.description}>
        <h2>Description</h2>
        <p>{itemResponse.description}</p>
      </section>
    </section>
  );
}

export { ItemHome };
