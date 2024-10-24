"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isPlayerPage = pathname.startsWith("/jobs");
  const isCompaniesPage = pathname.startsWith("/companies");
  const isProfilePage = pathname.startsWith("/user");
  const isSavedPage = pathname.startsWith("/saved");

  return (
    <div className="flex items-center gap-4   h-full ">
      {isAdminPage || isPlayerPage ? (
        <Link href={"/"}>
          <Button
            variant={"outline"}
            size={"default"}
            className="font-semibold"
          >
            <LogOut className="mr-2 text-xl" /> <p>Exist</p>
          </Button>
        </Link>
      ) : (
        <Link href={"/admin/jobs"}>
          <Button variant={"outline"} size={"sm"} className="font-semibold">
            Admin mode
          </Button>
        </Link>
      )}

      <Link href={"/profile"}>
        <UserButton />
      </Link>
    </div>
  );
};

export default NavbarRoutes;
