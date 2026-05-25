import { Nav } from "./Nav";
import { Footer } from "./Footer";
import styles from "./PageShell.module.css";

function PageShell({ children, className = "" }) {
  return (
    <div className={styles.shell}>
      <Nav />
      <main className={`${styles.main} ${className}`.trim()}>{children}</main>
      <Footer />
    </div>
  );
}

export { PageShell };
