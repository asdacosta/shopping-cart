import homeStyles from "../stylesheets/HomePage.module.css";
import { ids } from "./ids";
import { Item } from "./Item";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const [response, setResponse] = useState(null);

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

  const items = ids.map((id, index) => (
    <Item key={id} itemResponse={response[index]} />
  ));

  return (
    <>
      <section className={homeStyles.homeTitle}>
        <h2 className={homeStyles.header2}>Discover Latest Trends</h2>
        <div>
          <Link className={homeStyles.link} to="shop">
            Shop Now
          </Link>
        </div>
      </section>
      <section className={homeStyles.items}>{items}</section>
    </>
  );
}

export { WelcomePage };