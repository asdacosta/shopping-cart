import "../stylesheets/reset.css";
import "../stylesheets/tokens.css";
import "../stylesheets/global.css";
import { AppLayout } from "./layout/AppLayout";
import { WelcomePage } from "../pages/WelcomePage";
import { ShopPage } from "../pages/ShopPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { WishlistPage } from "../pages/WishlistPage";
import { AccountPage } from "../pages/AccountPage";
import { ErrorPage } from "../pages/ErrorPage";
import { LegacyItemRedirect } from "./LegacyRedirect";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "itemHome/:id", element: <LegacyItemRedirect /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "account", element: <AccountPage /> },
    ],
  },
];

export { routes };
