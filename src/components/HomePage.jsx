import homeStyles from "../stylesheets/HomePage.module.css";
import { Nav } from "./Nav";
import { ids } from "./ids";
import { Item } from "./Item";

function HomePage() {
  const items = ids.map((id, index) => <Item key={id} index={index} />);

  return (
    <>
      <Nav />
      <section className={homeStyles.homeTitle}>
        <h2 className={homeStyles.header2}>Discover Latest Trends</h2>
        <button className={homeStyles.button}>Shop Now</button>
      </section>
      <section className={homeStyles.items}>{items}</section>
    </>
  );
}

export { HomePage };
