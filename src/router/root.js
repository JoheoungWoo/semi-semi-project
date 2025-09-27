import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ListPage from "../pages/ListPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";
import ProductList from "../components/ProductList";

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
    path: "cart",
    element: <CartPage />,
  },
  // {
  //   path: "product/list",
  //   element: <ProductList />,
  // },
]);

export default root;
