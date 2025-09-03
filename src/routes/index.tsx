import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/Register";

import DashboardLayout from "../components/layout/DashboardLayout";
import { generateRoutes } from "../utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "../utils/withAuth";
import { role } from "../constants/role";



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
    path: "/dashboard",
    Component: withAuth(() => <DashboardLayout role={role.user} />, role.user),
    children: [
      // { index: true, element: <Navigate to="/dashboard/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
]);