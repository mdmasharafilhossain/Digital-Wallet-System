
import AgentManagement from "../pages/Admin/AgentManagement";
import UserManagement from "../pages/Admin/UserManagement";
import WalletManagement from "../pages/Admin/WalletManagement";
import Login from "../pages/login";

import type { ISidebarItem } from "../types";



export const adminSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        component: Login
      },
      {
        title: "User Management",
        url: "/admin/manage-user",
        component: UserManagement
      },
      {
        title: "Agent Management",
        url: "/admin/manage-agent",
        component: AgentManagement
      },
      {
        title: "Wallet Management",
        url: "/admin/manage-wallet",
        component: WalletManagement
      },
    ],
  },
];