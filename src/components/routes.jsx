import App from "../App.jsx";
import { ShopPage } from "./ShopPage.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { WelcomePage } from "./WelcomePage.jsx";
import { Cart } from "./Cart.jsx";
import { ItemHome } from "./ItemHome.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "cart", element: <Cart /> },
      { path: "itemHome/:id", element: <ItemHome /> },
    ],
  },
];

export { routes };
