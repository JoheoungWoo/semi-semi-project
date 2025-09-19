import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ListPage from "../pages/ListPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";

const root = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "list",
    element: <ListPage />,
  },
  {
    path: "product/:id",
    element: <DetailPage />,
  },
  {
    path: "cart/:id",
    element: <CartPage />,
  },
]);

export default root;
