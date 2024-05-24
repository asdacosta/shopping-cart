import { useEffect, useState } from "react";
import itemStyles from "../stylesheets/Item.module.css";

function Item({ itemResponse }) {
  const [showDescription, setShowDescription] = useState(false);
  const [pointer, setPointer] = useState("auto");

  useEffect(() => {
    if (!itemResponse) {
      setPointer("none");
    }
  }, []);

  function triggerShow() {
    setShowDescription(true);
  }

  function triggerHide() {
    setShowDescription(false);
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
      ) : (
        <div className={itemStyles.itemImage}></div>
      )}

      <div className={itemStyles.itemDetails}>
        <p>{itemResponse ? itemResponse.title : ""}</p>
        <p>$ {itemResponse ? itemResponse.price : ""}</p>
        <button>Add to Cart</button>
      </div>
    </section>
  );
}

export { Item };
