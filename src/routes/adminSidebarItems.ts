
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AgentManagement from "../pages/Admin/AgentManagement";
import TransactionList_Admin from "../pages/Admin/TransactionList_Admin";
import UserManagement from "../pages/Admin/UserManagement";
import WalletManagement from "../pages/Admin/WalletManagement";
import UserProfile from "../pages/User/UserProfile";


import type { ISidebarItem } from "../types";



export const adminSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        component: AdminDashboard
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
      {
        title: "All Trasactions",
        url: "/admin/transaction",
        component: TransactionList_Admin
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: UserProfile
      },
    ],
  },
];