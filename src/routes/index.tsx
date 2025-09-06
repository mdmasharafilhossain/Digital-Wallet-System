import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/Register";

import DashboardLayout from "../components/layout/DashboardLayout";
import { generateRoutes } from "../utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "../utils/withAuth";
import { role } from "../constants/role";
import { adminSidebarItems } from "./adminSidebarItems";



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
    path: "/user",
    Component: withAuth(() => <DashboardLayout role={role.user} />, role.user),
    children: [
      { index: true, element: <Navigate to="/user/dashboard" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
   {
    path: "/admin",
    Component: withAuth(() => <DashboardLayout role={role.admin} />, role.admin),
    children: [
      // { index: true, element: <Navigate to="/user/dashboard" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
]);