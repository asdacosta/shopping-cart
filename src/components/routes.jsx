import App from "../App.jsx";
import { ShopPage } from "./ShopPage.jsx";
import { HomePage } from "./HomePage.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { WelcomePage } from "./WelcomePage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: "shop", element: <ShopPage /> },
    ],
  },
];

export { routes };
