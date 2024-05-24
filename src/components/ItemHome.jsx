import itemHomeStyles from "../stylesheets/ItemHome.module.css";

function ItemHome() {
  return (
    <section className={itemHomeStyles.itemHome}>
      <section className={itemHomeStyles.image}>
        <p>Title</p>
      </section>
      <section className={itemHomeStyles.details}>
        <p>
          Category: <span></span>
        </p>
        <p>
          Rating: <span></span>
        </p>
        <p>
          Purchases: <span></span>
        </p>
        <p>
          Price: <span></span>
        </p>
      </section>
      <section className={itemHomeStyles.description}>
        <h2>Description</h2>
        <p></p>
      </section>
    </section>
  );
}

export { ItemHome };
