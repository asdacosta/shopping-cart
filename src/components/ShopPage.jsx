import { ids } from "./ids";
import { Item } from "./Item";
import { useState, useEffect } from "react";
import shopStyles from "../stylesheets/ShopPage.module.css";

function ShopPage() {
  const [response, setResponse] = useState(null);

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

  if (!response) {
    return;
  }

  const items = ids.map((id, index) => (
    <Item key={id} itemResponse={response[index]} />
  ));
  const emptyItems = ids.map((id) => <Item key={id} />);

  return (
    <>
      <section className={shopStyles.items}>
        {items}
        {emptyItems}
      </section>
    </>
  );
}

export { ShopPage };
