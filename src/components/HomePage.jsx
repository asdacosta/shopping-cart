import { useState } from "react";
import { Nav } from "./Nav";
import { Outlet } from "react-router-dom";

function HomePage() {
  const [navPage, setNavPage] = useState("home");

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export { HomePage };
