import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="md:border-r md:border-r-secondary bg-background w-80 flex-col fixed inset-0 py-6 ">
      {/* logo */}
      <Logo />
      <div className="mt-4">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
