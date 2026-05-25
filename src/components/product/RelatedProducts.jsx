import { ProductCard } from "./ProductCard";
import styles from "./RelatedProducts.module.css";

function RelatedProducts({ products, currentId }) {
  const related = products
    .filter((p) => p.id !== currentId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className={styles.related} aria-labelledby="related-heading">
      <h2 id="related-heading" className="display-heading">
        You may also appreciate
      </h2>
      <ul className={styles.grid}>
        {related.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export { RelatedProducts };
