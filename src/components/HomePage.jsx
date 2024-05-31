import { createContext, useState } from "react";
import { Nav } from "./Nav";
import { Outlet } from "react-router-dom";

export const ShopContext = createContext({
  allAdded: [],
  allQuantity: [],
  setAllAdded: () => {},
  setAllQuantity: () => {},
});

export const PageContext = createContext({
  page: "",
  setPage: () => {},
});

function HomePage() {
  const [allAdded, setAllAdded] = useState([false, false, false, false]);
  const [allQuantity, setAllQuantity] = useState([1, 1, 1, 1]);
  const [page, setPage] = useState("home");

  return (
    <>
      <PageContext.Provider value={{ page, setPage }}>
        <ShopContext.Provider
          value={{ allAdded, allQuantity, setAllAdded, setAllQuantity }}
        >
          <Nav />
          <Outlet />
        </ShopContext.Provider>
      </PageContext.Provider>
    </>
  );
}

export { HomePage };
