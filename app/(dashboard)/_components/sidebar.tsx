import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="md:border-r bg-white w-96 flex-col fixed inset-0 py-6">
      {/* logo */}
      <Logo />
      <div className="mt-4">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
