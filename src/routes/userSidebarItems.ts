import Login from "../pages/login";
import type { ISidebarItem } from "../types";



export const userSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Bookings",
        url: "/dashboard/bookings",
        component: Login
      },
    ],
  },
];