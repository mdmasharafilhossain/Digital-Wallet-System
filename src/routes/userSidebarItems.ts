
import UserDashboard from "../pages/User/UserDashboard";
import UserProfile from "../pages/User/UserProfile";
import type { ISidebarItem } from "../types";



export const userSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        component: UserDashboard
      },
      {
        title: "Manage Profile",
        url: "profile",
        component: UserProfile
      },
    ],
  },
];