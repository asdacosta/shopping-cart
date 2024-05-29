import { createContext, useState } from "react";
import { Nav } from "./Nav";
import { Outlet } from "react-router-dom";

export const ShopContext = createContext({
  allAdded: [],
  allQuantity: [],
  setAllAdded: () => {},
  setAllQuantity: () => {},
});

function HomePage() {
  const [allAdded, setAllAdded] = useState([false, false, false, false]);
  const [allQuantity, setAllQuantity] = useState([1, 1, 1, 1]);

  return (
    <>
      <Nav />
      <ShopContext.Provider
        value={{ allAdded, allQuantity, setAllAdded, setAllQuantity }}
      >
        <Outlet />
      </ShopContext.Provider>
    </>
  );
}

export { HomePage };
