import { createBrowserRouter } from "react-router-dom";
import About from "../components/About/About";
import Main from "../layouts/Main";
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
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
