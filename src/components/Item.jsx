import { useState } from "react";
import itemStyles from "../stylesheets/Item.module.css";
import { useEffect } from "react";

function Item({ index }) {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        encodeURIComponent("men's clothing"),
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => setImageURL(response[index].image))
      .catch((error) => console.error(error))
      .finally((response) => console.log(response));
  }, []);

  return (
    <section className={itemStyles.item}>
      <span className={itemStyles.info}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </span>
      <div
        className={itemStyles.itemImage}
        style={{ backgroundImage: `url(${imageURL})` }}
      ></div>
      <div className={itemStyles.itemDetails}>
        <p>Whatever</p>
        <p>2000 cedis</p>
        <button>Add to Cart</button>
      </div>
    </section>
  );
}

export { Item };
