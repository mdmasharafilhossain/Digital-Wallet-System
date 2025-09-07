

import type { User } from "../types";
import { role } from "../constants/role";
import { userSidebarItems } from "../routes/userSidebarItems";
import { adminSidebarItems } from "../routes/adminSidebarItems";
import { agentSidebarItems } from "../routes/agentSidebarItems";


export const getSidebarItems = (userRole: User["role"]) => {
  switch (userRole) {
    case role.agent:
      return [...agentSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};