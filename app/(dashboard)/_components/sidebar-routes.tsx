"use client";

import {
  BookMarked,
  Briefcase,
  Building2,
  Compass,
  HomeIcon,
  Search,
  UserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import SidebarRoute from "./siderbar-route";

const adminRoutes = [
  {
    label: "Jobs",
    icon: Briefcase,
    href: "/admin/jobs",
  },
  {
    label: "Companies",
    icon: Building2,
    href: "/admin/companies",
  },
  {
    label: "Analytics",
    icon: Compass,
    href: "/admin/analytics",
  },
];
const guestRoutes = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    label: "Search",
    icon: Search,
    href: "/search",
  },
  {
    label: "Profile",
    icon: UserIcon,
    href: "/user",
  },
  {
    label: "Saved Jobs",
    icon: BookMarked,
    href: "/saved/jobs",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <div className="flex flex-col">
      {isAdminPage
        ? adminRoutes.map((route, index) => {
            return (
              <SidebarRoute
                key={index}
                label={route.label}
                icon={route.icon}
                href={route.href}
              />
            );
          })
        : guestRoutes.map((route, index) => {
            return (
              <SidebarRoute
                key={index}
                label={route.label}
                icon={route.icon}
                href={route.href}
              />
            );
          })}
    </div>
  );
};

export default SidebarRoutes;
