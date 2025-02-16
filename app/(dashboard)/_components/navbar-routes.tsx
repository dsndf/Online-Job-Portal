"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const NavbarRoutes = () => {
  //Hooks states
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

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
            <LogOut className="mr-2 text-xl w-4 h-4" /> <p>Exist</p>
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
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className=" dark:hidden w-[1.2rem] h-[1.2rem]" />
        <Moon className="hidden dark:block  w-[1.2rem] h-[1.2rem]" />
      </Button>
    </div>
  );
};

export default NavbarRoutes;
