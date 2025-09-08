
import Settings from "../pages/Settings";
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
      {
        title: "Settings",
        url: "settings",
        component: Settings
      },
      {
        title: "Go To Home",
        url: "../",
        component: null
      },
    ],
  },
];