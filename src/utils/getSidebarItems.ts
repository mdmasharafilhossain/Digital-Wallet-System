

import type { User } from "../types";
import { role } from "../constants/role";
import { userSidebarItems } from "../routes/userSidebarItems";
import { adminSidebarItems } from "../routes/adminSidebarItems";


export const getSidebarItems = (userRole: User["role"]) => {
  switch (userRole) {
    // case role.superAdmin:
    //   return [...adminSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};