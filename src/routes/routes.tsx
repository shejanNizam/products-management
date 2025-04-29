import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import EditProduct from "../pages/Main/EditProduct/EditProduct";
import Home from "../pages/Main/Home/Home/Home";
import ProductDetail from "../pages/Main/ProductDetail/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/products/:id/edit",
        element: <EditProduct />,
      },
    ],
  },
]);

export default router;
