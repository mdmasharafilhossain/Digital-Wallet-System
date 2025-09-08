
import AgentDashboard from "../pages/Agent/AgentDashboard";

import UserProfile from "../pages/User/UserProfile";
import type { ISidebarItem } from "../types";



export const agentSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Dashboard",
        url: "/agent/dashboard",
        component: AgentDashboard
      },
      {
        title: "Manage Profile",
        url: "profile",
        component: UserProfile
      },
      {
        title: "Go To Home",
        url: "../",
        component: null
      },
    ],
  },
];