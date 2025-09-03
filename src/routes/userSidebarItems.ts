import Login from "../pages/login";
import type { ISidebarItem } from "../types";



export const userSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        component: Login
      },
    ],
  },
];