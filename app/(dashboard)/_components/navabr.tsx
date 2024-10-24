import React from "react";
import NavbarRoutes from "./navbar-routes";
import MobileRoutes from "./mobile-routes";

const Navbar = () => {
  return (
    <div className="h-20 border flex justify-between items-center px-6 py-2">
      {/* mobile routes */}
      <MobileRoutes />
      {/* navbar routes */}
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
