import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/register";


export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children : [
    {
      Component: Login,
      path: "/login"
    },
    {
      Component: Register,
      path: "/register"
    }
        



    ]
   
  },
]);