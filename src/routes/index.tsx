import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/Register";
import UserDashboard from "../components/layout/UserDashboard";
import DashboardLayout from "../components/layout/DashboardLayout";



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
    },
      
        



    ]
   
  },

  {
    Component: DashboardLayout,
    path: "/dashboard",
    children : [

    ]
  }
]);