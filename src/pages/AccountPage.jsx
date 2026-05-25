import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../services/productApi";
import { useShop } from "../context/ShopProvider";
import { Button } from "../components/ui/Button";
import styles from "./AccountPage.module.css";

function AccountPage() {
  const { recentViews } = useShop();
  const [orders, setOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("evertrend-orders") || "[]");
      setOrders(stored);
    } catch {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    if (recentViews.length === 0) return;
    import("../services/productApi").then(({ fetchAllProducts }) => {
      fetchAllProducts().then((all) => {
        setRecentProducts(
          recentViews
            .map((id) => all.find((p) => p.id === id))
            .filter(Boolean)
            .slice(0, 4)
        );
      });
    });
  }, [recentViews]);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p className="label-caps">Your EverTrend</p>
        <h1 className="display-heading">Account</h1>
      </header>

      <div className={styles.grid}>
        <section className={styles.panel} aria-labelledby="orders-heading">
          <h2 id="orders-heading">Recent orders</h2>
          {orders.length === 0 ? (
            <p className={styles.empty}>
              No orders yet. Complete checkout to see order history here.
            </p>
          ) : (
            <ul className={styles.orderList}>
              {orders.map((order) => (
                <li key={order.id} className={styles.order}>
                  <div>
                    <span className={styles.orderId}>{order.id}</span>
                    <span className={styles.orderDate}>
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className={styles.orderMeta}>
                    <span>{order.items} items</span>
                    <span>{formatPrice(order.total)}</span>
                    <span className={styles.status}>Delivered</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link to="/shop">
            <Button variant="secondary" size="sm">
              Continue shopping
            </Button>
          </Link>
        </section>

        <section className={styles.panel} aria-labelledby="profile-heading">
          <h2 id="profile-heading">Profile</h2>
          <dl className={styles.profile}>
            <div>
              <dt>Name</dt>
              <dd>Guest Member</dd>
            </div>
            <div>
              <dt>Member since</dt>
              <dd>2026</dd>
            </div>
            <div>
              <dt>Loyalty tier</dt>
              <dd className={styles.tier}>Meridian</dd>
            </div>
          </dl>
        </section>

        {recentProducts.length > 0 && (
          <section
            className={`${styles.panel} ${styles.recent}`}
            aria-labelledby="recent-heading"
          >
            <h2 id="recent-heading">Recently viewed</h2>
            <ul className={styles.recentList}>
              {recentProducts.map((p) => (
                <li key={p.id}>
                  <Link to={`/product/${p.id}`} className={styles.recentItem}>
                    <img src={p.image} alt="" />
                    <span>{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export { AccountPage };
