import React from "react";
import { NavLink, Outlet } from "react-router";
// import { getSidebarItems } from "@/utils/getSidebarItems"; 
// import { TRole } from "@/types";

// type DashboardLayoutProps = {
//   role: TRole;
// };
// <DashboardLayoutProps>
const DashboardLayout: React.FC = ({ role }) => {
  // const sidebarItems = getSidebarItems(role);

  return (
    <div className="flex h-screen bg-[#1c3144] text-[#E6D5B8]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#C8A978]/30 p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        {/* <nav className="space-y-6">
          {sidebarItems.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm uppercase tracking-wide text-[#C8A978] font-semibold mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.url}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#C8A978] text-[#1c3144] font-bold"
                          : "hover:text-[#C8A978]"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
