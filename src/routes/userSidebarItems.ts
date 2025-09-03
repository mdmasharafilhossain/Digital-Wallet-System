
import UserDashboard from "../pages/User/UserDashboard";
import type { ISidebarItem } from "../types";



export const userSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        component: UserDashboard
      },
    ],
  },
];