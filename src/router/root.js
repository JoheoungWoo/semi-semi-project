import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ListPage from "../pages/ListPage";
import DetailPage from "../pages/DetailPage";

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
]);

export default root;
