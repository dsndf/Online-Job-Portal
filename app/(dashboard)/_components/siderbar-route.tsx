"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarRouteParams {
  label: string;
  icon: LucideIcon;
  href: string;
}

const SidebarRoute = ({ label, icon: Icon, href }: SidebarRouteParams) => {
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  };

  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <button onClick={onClick} className="w-full relative">
      <div
        className={cn(
          "h-full px-6 py-4 text-sm flex items-center justify-start gap-4 hover:bg-secondary transition-all duration-500",
          isActive && "bg-secondary"
        )}
      >
        {<Icon className="w-4 h-4" />}
        {label}
      </div>
      {/* highlighter */}
      <span
        className={cn(
          isActive &&
            "absolute right-0 top-0 bottom-0 w-1 rounded-md bg-primary"
        )}
      ></span>
    </button>
  );
};

export default SidebarRoute;
