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
import { agentSidebarItems } from "./agentSidebarItems";
import Unauthorized from "../utils/Unauthorized";
import Home from "../pages/Home";
import About from "../pages/About";
import Features from "../pages/Features";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";



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
    {
      Component : Unauthorized,
      path:'/unauthorized'
    },
    {
      Component: Home,
      path:'/'
    },
    {
      Component: About,
      path:'/about'
    },
    {
      Component: Features,
      path:'/features'
    },
    {
      Component: Contact,
      path:'/contact'
    },
    {
      Component: FAQ,
      path:'/faq'
    }
      
        



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
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
   {
    path: "/agent",
    Component: withAuth(() => <DashboardLayout role={role.agent} />, role.agent),
    children: [
      { index: true, element: <Navigate to="/agent/dashboard" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
]);