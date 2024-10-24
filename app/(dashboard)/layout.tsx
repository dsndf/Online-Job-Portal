import React, { ReactNode } from "react";
import Navbar from "./_components/navabr";
import Sidebar from "./_components/sidebar";

const DashboardPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      {/* Header */}
      <header>
        <Navbar />
      </header>

      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* main content */}
      <main className=" h-full md:pl-96">
        {children}
      </main>
    </div>
  );
};

export default DashboardPageLayout;
