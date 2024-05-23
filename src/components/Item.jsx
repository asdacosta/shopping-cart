import { useState } from "react";
import itemStyles from "../stylesheets/Item.module.css";
import { useEffect } from "react";

function Item({ index }) {
  const [details, setDetails] = useState({
    image: null,
    title: null,
    description: null,
    price: null,
  });
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        encodeURIComponent("men's clothing"),
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const item = response[index];
        const trimmedDescription = item.description.split(".")[0] + ".";
        setDetails({
          image: item.image,
          title: item.title,
          description: trimmedDescription,
          price: item.price,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  function triggerShow() {
    setShowDescription(true);
  }

  function triggerHide() {
    setShowDescription(false);
  }

  return (
    <section className={itemStyles.item}>
      <span
        className={itemStyles.info}
        onMouseOver={triggerShow}
        onMouseOut={triggerHide}
      >
        {showDescription ? (
          <p>{details.description}</p>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
        )}
      </span>
      {!showDescription ? (
        <div className={itemStyles.itemImage}>
          <img src={details.image} alt={details.title} />
        </div>
      ) : (
        <div className={itemStyles.itemImage}></div>
      )}

      <div className={itemStyles.itemDetails}>
        <p>{details.title}</p>
        <p>$ {details.price}</p>
        <button>Add to Cart</button>
      </div>
    </section>
  );
}

export { Item };
