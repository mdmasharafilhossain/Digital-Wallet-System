
import Login from "../pages/login";
import UserDashboard from "../pages/User/UserDashboard";
import UserProfile from "../pages/User/UserProfile";
import type { ISidebarItem } from "../types";



export const adminSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        component: Login
      },
    //   {
    //     title: "Manage Profile",
    //     url: "/admin/profile",
    //     component: UserProfile
    //   },
    ],
  },
];