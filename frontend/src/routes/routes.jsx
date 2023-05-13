import { createBrowserRouter } from "react-router-dom";
import Header from "../components/shared/Header";
import NotFound from "../components/shared/NotFound";
import Main from "../layout/Main";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Search from "../pages/Search";
import List from "../pages/List";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/list",
        element: <List />,
      },
    ],
  },
]);
