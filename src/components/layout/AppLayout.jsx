import { Outlet } from "react-router-dom";
import { ShopProvider } from "../../context/ShopProvider";
import { PageShell } from "./PageShell";

function AppLayout() {
  return (
    <ShopProvider>
      <PageShell>
        <Outlet />
      </PageShell>
    </ShopProvider>
  );
}

export { AppLayout };
