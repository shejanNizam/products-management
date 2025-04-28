import { createBrowserRouter } from "react-router-dom";
import About from "../components/About/About";
import Main from "../layouts/Main";
import Home from "../pages/Main/Home/Home/Home";

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
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
